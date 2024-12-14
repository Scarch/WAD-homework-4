<template>
    <div class="A Post">
        <div id="form">
            <h3>A Post</h3>
            <label for="title">Title: </label>
            <input name="type" type="text" id="title" required v-model="post.title" />
            <label for="body">Body: </label>
            <textarea name="body" type="text" id="body" required v-model="post.body" rows="5" cols="40"/>
            <div class="Buttons">
                <button @click="updatePost" class="updatePost">Update Post</button>
                <button @click="deletePost" class="deletePost">Delete Post</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "Post",
    data() {
        return {
            post: {
                id: "",
                title: "",
                body: "",
            },
        };
    },
    methods: {
        fetchAPost(id) {
            // Fetch one post with the specied id (id)
            fetch(`http://localhost:3000/api/posts/${id}`)
                .then((response) => response.json())
                .then((data) => (this.post = data))
                .catch((err) => console.log(err.message));
        },
        updatePost() {
            // Using Fetch - put method - updates a specific post based on the passed id and the specified body
            fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.post),
            })
                .then((response) => {
                    console.log(response.data);
                    // We are using the router instance of this element to navigate to a different URL location
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deletePost() {
            // using Fetch - delete method - delets a specific post based on the passed id
            fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    console.log(response.data);
                    // We are using the router instance of this element to navigate to a different URL location
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        // Calls fetchAPost() when this view mounts, and passes it a route parameter (id)
        // Route parameters (this.$route.params.id) are named URL segments that are used to capture the values specified at their 
        // position in the URL. The captured values are populated in the req.params object, with the name 
        // of the route parameter specified in the path as their respective keys
        this.fetchAPost(this.$route.params.id);
    },
};
</script>

<style scoped>
#form {
    height: 100%;
    max-width: 540px;
    margin: 6% auto;
    border-radius: 25px;
    padding: 40px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    background-color: rgba(231, 230, 230, 0.722);
}

label {
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input,
textarea {
    display: block;
    padding: 10px 10px;
    width: 85%;
    align-self: center;
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
}

textarea {
    resize: vertical;
}

.Buttons {
    width: 100%;
    max-width: 540px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    gap: 80px;
}

@media (max-width: 768px) {
    #form {
        width: 70%;
    }

    .Buttons {
        font-size: 0.8em;
        width: 100%;
        gap: 30px;
    }
}
</style>