import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";

const isAuthenticated = store.getters.getUser

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated) next({name: 'Login'})
      else next()
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
