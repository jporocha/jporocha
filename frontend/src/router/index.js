import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import NewRequest from "@/components/Request/RequestForm";
import NotFound from "../views/NotFound.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      axios
        .get("auth/user")
        .then((res) => {
          if (res.data.id) {
            store.state.user = res.data;
            next();
          } else {
            next({ name: "Login" });
          }
        })
        .catch(() => {
          next({ name: "Login" });
        });
    },
    children: [
      {
        path: "pedido",
        component: NewRequest,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "*",
    name: "PNF",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
