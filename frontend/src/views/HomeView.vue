<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Log Out</button>
    </div>
    <div id="post-list">
      <h1>All Posts</h1>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <!-- / We are putting an anchor for each post, when we click on it, we will be directed to the specific post view (/api/posts/{id}) /  -->
          <a class="singlepost" @click="routePost(post.id)">
            <span class="title"> <b>{{ post.title }}</b> <span class="timestamp">{{ formatDate(post.created_at)
                }}</span></span><br />
            <span class="body"> {{ post.body }} </span> <br />
          </a>
        </div>
      </ul>
    </div>
    <div class="bottomBtns">
      <button v-if="authResult" @click="routeAddPost()">Add Post</button>
      <button v-if="authResult" @click="deleteAllPosts()">Delete All</button>
    </div>
  </div>
</template>

<script>
import auth from "../auth";

export default {
  name: "HomeView",
  data: function () {
    return {
      posts: [],
      authResult: auth.authenticated()
    }
  },
  methods: {
    formatDate(datetime) {
      return new Date(datetime).toLocaleString();
    },
    deleteAllPosts() {
      fetch(`http://localhost:3000/api/posts/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      this.posts = [] // Clearing posts on the page as well
    },
    routePost(id) {
      this.$router.push("/posts/" + id)
    },
    routeAddPost() {
      this.$router.push("/addpost")
    },
    fetchPosts() {
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Necessary for cookies working as intended
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('JWT removed');
          this.$router.push("/login");
        })
        .catch((e) => {
          console.log(e);
          console.log("ERROR ON LOGOUT");
        });
    },
  },
  mounted() {
    // call fetchPosts() when this element (AllPosts) mounts 
    this.fetchPosts();
    console.log("mounted");
  },
};
</script>

<style>
.timestamp {
  float: right;
  font-size: medium;
}

.title {
  font-size: larger;
  text-align: left;
  margin-bottom: 30px
}

.item {
  display: flex;
  justify-content: center;
}

/** see ei ole keskel hetkel */
.singlepost {
  width: 100%;
  max-width: 540px;
  margin: 25px auto;
  border-radius: 25px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: rgba(231, 230, 230, 0.722);
  cursor: pointer;
  box-sizing: border-box;
}

.body {
  text-align: left;
}

.container {
  margin: 20px;
}

button {
  width: 30%;
  min-width: 50px;
  max-width: 250px;
  padding: 10px;
  background-color: rgb(19, 45, 196);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(9, 32, 163);
}

.bottomBtns {
  margin: 10px auto;
  display: flex;
  justify-content: center;
  gap: 80px;
}

@media (max-width: 768px) {
  .singlepost {
    width: 80%;
  }

  .Buttons {
    font-size: 0.8em;
    width: 60%;
    gap: 30px;
  }
}
</style>