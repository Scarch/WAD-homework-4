import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import Post from "../views/Post.vue";
import AddPost from "../views/AddPost.vue";
import auth from "../auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },

  {
    path: "/addpost",
    name: "AddPost",
    component: AddPost,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/posts/:id",
    name: "Post",
    component: Post,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/contact",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    // Routing to login page if no other routes match
    path: "/:catchAll(.*)",
    name: "LogIn",
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
