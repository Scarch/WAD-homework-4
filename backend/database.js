// database.js
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "sql",
  database: "testWad",
  host: "localhost",
  port: "5432",
});

const execute = async (query) => {
  try {
    await pool.connect(); // create a connection
    await pool.query(query); // executes a query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

// Creating the users table in case it doesn't exist
const createUsersTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

execute(createUsersTblQuery).then((result) => {
  if (result) {
    console.log('Table "users" has been created');
  }
});

// Creating the posts table in case it doesn't exist
const createPostsTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

execute(createPostsTblQuery).then((result) => {
  if (result) {
    console.log('Table "posts" has been created');
  }
});

module.exports = pool;
