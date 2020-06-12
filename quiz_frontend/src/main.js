import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store/store";

Vue.config.productionTip = false;
axios.defaults.withCredentials = true; // This remember which session is on User through axios !!

export const bus = new Vue();

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
