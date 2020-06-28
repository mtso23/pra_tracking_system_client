import Vue from "vue";
import VueRouter from "vue-router";

import Buefy from "buefy";
import JsonCSV from "vue-json-csv";

import App from "./App.vue";
import Form from "./components/Form/Form";
import Home from "./components/Home";

Vue.config.productionTip = false;

// Create VueRouter with routes to Home and Form based on url path.
//  Note that "props: true" for the Form route allows us to pre-fill
//  the form when we are viewing a form that already has data
Vue.use(VueRouter);
const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/form", component: Form, name: "Form", props: true },
];
const router = new VueRouter({ routes });

// Buefy is the component/design library used throughout the app
Vue.use(Buefy, {
  defaultIconPack: "fas",
});

// JsonCSV is used to export table data as a csv
Vue.component("downloadCsv", JsonCSV);

// Register the App component as the entrypoint for the Vue application
//  and register the VueRouter to handle routing
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
