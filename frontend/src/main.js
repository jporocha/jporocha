import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

axios.defaults.baseURL = process.env.VUE_APP_SERVER;
axios.defaults.withCredentials = true;

dayjs.locale("pt-br");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
