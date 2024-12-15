<template>
    <div class="form">
        <h3>Add a Post</h3>
        <div class="addP">
            <label for="title">Title: </label>
            <input name="title" type="text" id="title" required v-model="post.title" />
            <label for="body">Body: </label>
            <textarea name="body" id="body" required v-model="post.body" rows="5" cols="40"/>
        </div>
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

<style scoped>

.form {
    max-width: 540px;
    margin: 6% auto;
    border-radius: 25px;
    padding: 40px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    background-color: rgba(230, 230, 231, 0.825);
}

h3{
    margin: 0%;
}

.addP{
    display: flex;
    flex-direction: column;
    align-items: center;
}

label{
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

#body{
    width: 100%;
    height: auto; 
    resize: vertical; 
    font-size: 16px;
    padding: 3%;
}

button{
    max-width: 540px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
}

textarea {
    resize: vertical;
}

@media (max-width: 768px) {
    .form {
        width: 70%;
    }

    button {
        font-size: 0.8em;
        width: 100%;
    }
}
</style>