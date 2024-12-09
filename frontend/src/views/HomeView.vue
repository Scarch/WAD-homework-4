<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div id="post-list">
      <h1>All Posts</h1>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <!-- / We are putting an anchor for each post, when we click on it, we will be directed to the specific post view (/api/posts/{id}) /  -->
          <a class="singlepost" @click="routePost(post.id)">
            <span class="title"> <b>Title:</b> {{ post.title }} </span><br />
            <span class="body"> <b>Body:</b> {{ post.body }} </span> <br />
          </a>
        </div>
      </ul>
    </div>
    <button v-if="authResult" @click="routeAddPost()">Add post</button>
    <button v-if="authResult" @click="deleteAllPosts()">Delete all</button>
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
    deleteAllPosts() {
      fetch(`http://localhost:3000/api/posts/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      this.posts = [] // Clearing posts on the page as well
    },
    routePost(id) {
      this.$router.push("/api/posts/" + id)
    },
    routeAddPost() {
      this.$router.push("/api/posts/")
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