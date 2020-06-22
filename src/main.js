import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "./components/Home";
import Form from "./components/Form/Form";
import Buefy from "buefy";
import JsonCSV from "vue-json-csv";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

Vue.use(VueRouter);
Vue.component("downloadCsv", JsonCSV);

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/form", component: Form, name: "Form", props: true },
];

const router = new VueRouter({ routes });

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
