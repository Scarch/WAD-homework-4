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
    display: flex;
    flex-direction: column;
    margin: 3% auto;
    padding: 3%;
    width: 50%;
    background-color: rgba(231, 230, 230, 0.722);
    justify-content: center;
    align-items: center;
    border-radius: 25px;
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
    margin: 3%;
    padding: 3%;
}

input{
    font-size: 16px;
    margin: 3%;
    padding: 3%;
    width: auto;
}

#body{
    width: 100%;
    height: auto; 
    resize: vertical; 
    font-size: 16px;
    padding: 3%;
}

button{
    margin: 2%;
}

</style>