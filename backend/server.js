// server.js
const express = require("express");
const pool = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "http://localhost:8080", credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "VMWBk984L76J%pB^W^*5K56bT2fnH#*49fWjy9pUFpe98f58ik";
const maxAge = 60 * 60 * 2; // 60 seconds * 60 minutes * 2 = 2 hours

const generateJWT = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

app.listen(port, () => {
  console.log("Server is listening to port " + port);
});

// --------------------------------

// Handling authentication

// --------------------------------

// Checking if a user is authenticated
app.get("/auth/authenticate", async (req, res) => {
  console.log("An authentication request has arrived");
  const token = req.cookies.jwt; // Assign the token named jwt to the token const
  let authenticated = false; // A user is not authenticated until proven otherwise
  try {
    if (token) {
      // Token exists, let's verify it
      await jwt.verify(token, secret, (err) => {
        if (err) {
          // Not verified, redirect to login page
          console.log(err.message);
          console.log("Token is invalid");
          res.send({ authenticated: authenticated }); // authenticated = false
        } else {
          // Token has been verified,
          console.log("Author is authenticated");
          authenticated = true;
          res.send({ authenticated: authenticated }); // authenticated = true
        }
      });
    } else {
      // When the token does not exist
      console.log("Author is not authenticated");
      res.send({ authenticated: authenticated }); // authenticated = false
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// signup a user
app.post("/auth/signup", async (req, res) => {
  try {
    console.log("A signup request has arrived");
    //console.log(req.body);
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
    const bcryptPassword = await bcrypt.hash(password, salt); // hash the password and the salt
    const authUser = await pool.query(
      // insert the user and the hashed password into the database
      "INSERT INTO users(email, password) values ($1, $2) RETURNING*",
      [email, bcryptPassword]
    );
    console.log(authUser.rows[0].id);
    const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
    //console.log(token);
    //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
    //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
    res
      .status(201)
      .cookie("jwt", token, { maxAge: 6000000, httpOnly: true })
      .json({ user_id: authUser.rows[0].id }).send;
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    console.log("A login request has arrived");
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0)
      return res.status(401).json({ error: "User is not registered" });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });

    const token = await generateJWT(user.rows[0].id);
    res
      .status(201)
      .cookie("jwt", token, { maxAge: 6000000, httpOnly: true })
      .json({ user_id: user.rows[0].id }).send;
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Logging out - we need to delete our JWT cookie/token
app.get("/auth/logout", (req, res) => {
  console.log("Delete JWT request arrived");
  res.status(202).clearCookie("jwt").json({ Msg: "cookie cleared" }).send;
});

// --------------------------------

// Handling posts

// --------------------------------

// Creates a post
app.post("/api/posts", async (req, res) => {
  try {
    const post = req.body;
    const newpost = await pool.query(
      "INSERT INTO posts(title, body) values ($1, $2)    RETURNING*",
      [post.title, post.body]
    );
    res.json(newpost);
  } catch (err) {
    console.error(err.message);
  }
});

// Gets all posts
app.get("/api/posts", async (req, res) => {
  try {
    console.log("Get posts request has arrived");
    const posts = await pool.query("SELECT * FROM posts");
    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Gets a specific post
app.get("/api/posts/:id", async (req, res) => {
  console.log(req.params);
  try {
    console.log("Get post with route parameter request has arrived");
    const { id } = req.params; // assigning all route "parameters" to the id "object"
    const posts = await pool.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    res.json(posts.rows[0]); // Accessing the first row of the returned table (since we technically get a table from the database, which we know only has one row)
  } catch (err) {
    console.error(err.message);
  }
});

// Updates a specific post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    console.log("Update post request has arrived");
    const updatepost = await pool.query(
      "UPDATE posts SET (title, body) = ($2, $3) WHERE id = $1",
      [id, post.title, post.body]
    );
    res.json(updatepost);
  } catch (err) {
    console.error(err.message);
  }
});

// Deletes a specific post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete post request has arrived");
    const deletepost = await pool.query("DELETE FROM posts WHERE id = $1", [
      id,
    ]);
    res.json(deletepost);
  } catch (err) {
    console.error(err.message);
  }
});

// Deletes all posts
app.delete("/api/posts/", async (req, res) => {
  try {
    console.log("Delete all posts request has arrived");
    const deleteAllPosts = await pool.query("TRUNCATE posts");
    res.json(deleteAllPosts);
  } catch (err) {
    console.error(err.message);
  }
});
