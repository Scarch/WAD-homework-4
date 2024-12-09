<template>
    <div class="form">
        <h3>Add a Post</h3>
        <label for="title">Title: </label>
        <input name="title" type="text" id="title" required v-model="post.title" />
        <label for="body">Body: </label>
        <input name="body" type="text" id="body" required v-model="post.body" />
        <button @click="addPost" class="addPost">Add Post</button>
    </div>
</template>

<script>
export default {
    name: "AddPost",
    data() {
        return {
            post: {
                title: "",
                body: "",
            },
        };
    },
    methods: {
        addPost() {
            var data = {
                title: this.post.title,
                body: this.post.body,
            };
            // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
            fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    console.log(response.data);
                    // redirect to home view
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("error");
                });
        },
    },
};
</script>