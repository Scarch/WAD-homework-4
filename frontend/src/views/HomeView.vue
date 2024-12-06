<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div id="post-list">
      <h1>All Posts</h1>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <!-- / We are putting an anchor for each post, when we click on it, we will be directed to the specific post view (/apost/) /  -->
          <a class="singlepost" :href="'/api/posts/' + post.id">
            <span class="title"> <b>Title:</b> {{ post.title }} </span><br />
            <span class="body"> <b>Body:</b> {{ post.body }} </span> <br />
          </a>
        </div>
      </ul>
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
    fetchPosts() {
      // You should remember how Fetch API works
      // fetch is a GET request unless stated otherwise. Therefore, it will fetch all posts from the database
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('jwt removed');
          //console.log('jwt removed:' + auth.authenticated());
          this.$router.push("/login");
          //location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error logout");
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