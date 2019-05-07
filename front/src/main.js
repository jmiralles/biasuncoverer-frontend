import Vue from "vue";
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";

import App from "./App.vue";

Vue.component("vue-layout", require("./layouts/VueLayout.vue").default);

import "./styles/custom.scss";

Vue.use(BootstrapVue);

sync(store, router);

new Vue({
  render: h => h(App),
  el: "#app",
  router,
  store
});
