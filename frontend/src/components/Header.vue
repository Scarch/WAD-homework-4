<template>
    <div class="header">
        <nav>
            <router-link to="/" class="nav-link">Home</router-link> |
            <router-link to="/contact">Contact us</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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