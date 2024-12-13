<template>
    <div class="form">
        <div class="inputs">
            <div class="email">
                <label for="email">Email</label>
                <input type="email" name="email" required v-model="email">
            </div>
            <div class="password">
                <label for="password">Password</label>
                <input type="password" name="password" required v-model="password">
            </div>
        </div>
        <button @click="SignUp" class="SignUp">Sign Up</button>
    </div>
</template>

<script>
export default {
    name: "SignUp",

    data: function () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {


        SignUp() {
            var data = {
                email: this.email,
                password: this.password
            };
            // Using Fetch - post method - send an HTTP post request to the specified URI with the defined body
            // Post creation time will be automatically assigned
            fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', //  Necessary for cookies to work
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("error");
                });
        },
    },
}
</script>

<style scoped>
.inputs {
    display: table;
    border-spacing: 10px;
    padding-bottom: 50px;
    font-size: large;
}

.email,
.password {
    display: table-row;
}

label {
    display: table-cell;
    padding-right: 10px;
}

input {
    display: table-cell;
}

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
    height: fit-content;
}

.container {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    padding: 3%;
}

.email {
    justify-content: center;
}

.email>label {
    margin: 4%;
    justify-content: center;
}

.email>input {
    font-size: 16px;
}

.password {
    padding: 5%;
    justify-content: center;
}

.password>label {
    margin: 4%;
    justify-content: end;
}

.password>input {
    font-size: 16px;
}
</style>