<template>
  <Fragment>
    <Header></Header>
    <Footer></Footer>
  </Fragment>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { Fragment } from 'vue';

export default {
  components: {
    Header, Footer
  },
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}
</script>

<style>
* {
  font-family: 'Trebuchet MS', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: rgba(238, 238, 238, 0.722);
  border-radius: 8px;
}

nav a {
  font-weight: bold;
  /*color: #2c3e50;*/
  text-decoration: none;
  color: black;
  padding: 5px 10px;
}

nav a.router-link-exact-active {
  color: rgb(19, 45, 196);
}

nav a:hover {
  background-color: #e4e4e4c4;
  border: 1px;
  border-radius: 5px;
}
</style>