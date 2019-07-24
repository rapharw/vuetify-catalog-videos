import "babel-polyfill"; //IE 11
import Vue from "vue";
import App from "./App.vue";
import "./plugins/vuetify";
import Axios from "axios";
import VueAxios from "vue-axios";
import "vue-material/dist/vue-material.min.css";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

//Cookies
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import router from './router';

import {
  store
} from "@/store";


// Components
import "./components";

import VueMaterial from "vue-material";
Vue.use(VueMaterial);

Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;

Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");