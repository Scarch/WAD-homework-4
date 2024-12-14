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
/* Aligning input fields */
.inputs {
    display: table;
    border-spacing: 10px;
    padding-bottom: 50px;
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
    border-radius: 10px;
    border-width: 1px;
    border-color: black;
    font-size: large;
    padding: 3.5%;
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
        width: 100%;
        margin: auto 5%;
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
    background-color: rgba(231, 230, 230, 0.722);
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