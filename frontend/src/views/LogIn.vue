<template>
    <div class="form">
        <h3>LogIn</h3>
        <label for="email">Email</label>
        <input type="email" name="email" required v-model="email">
        <label for="password">Password</label>
        <input type="password" name="password" required v-model="password">
        <div class="container">
            <button @click="LogIn" class="center">LogIn</button>
            <button @click='this.$router.push("/signup")' class="center">Signup</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "LogIn",

    data: function () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {


        LogIn() {
            var data = {
                email: this.email,
                password: this.password
            };
            // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
            fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', //  Don't forget to specify this if you need cookies
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    //this.$router.push("/");
                    location.assign("/");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("error");
                });
        },
    },
}

</script>