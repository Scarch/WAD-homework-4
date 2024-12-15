export default {
  user: { authenticated: false },
  authenticated: async function () {
    await fetch("http://localhost:3000/auth/authenticate", {
      credentials: "include", // Necessary for cookies to work
    })
      .then((response) => response.json())
      .then((data) => {
        this.user.authenticated = data.authenticated;
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
        console.log("ERROR ON LOGOUT");
      });
    return this.user.authenticated;
  },
};
