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
        <div class="container">
            <button @click="LogIn()" class="center">Log In</button>
            <p>OR</p>
            <button @click='this.$router.push("/signup")' class="center">Sign Up</button>
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
            // Using Fetch - post method - sending an HTTP post request to the specified URI with the defined body
            fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', // Necessary for receiving the login cookie
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("ERROR ON LOGIN");
                });
        },
    },
}

</script>

<style scoped>
/* Aligning input fields */
.inputs {
    display: table;
    border-spacing: 10px;
    font-size: large;
}

/* Aligning input fields */
.email,
.password {
    display: table-row;
}

/* Aligning input fields */
label {
    display: table-cell;
    padding-right: 10px;
}

/* Aligning input fields */
input {
    display: table-cell;
    font-size: large;
    border: none;
    border-radius: 10px;
    border-width: 1px;
    border-color: black;
    padding: 10px 10px;
}

/* Smaller screen compatibility */
@media (max-width: 550px) {
    .form {
        width: 70%;
    }

    input {
        width: 100%;
        font-size: small;
    }

    button {
        font-size: 0.8em;
        width: 40%;
    }

}

.form {
    max-width: 540px;
    margin: 100px auto;
    border-radius: 25px;
    padding: 40px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(231, 230, 230, 0.825);
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


.password {
    padding: 5%;
    justify-content: center;
}

.password>label {
    margin: 4%;
    justify-content: end;
}
</style>
