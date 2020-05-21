import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"


Vue.config.productionTip = false;
axios.defaults.withCredentials = true; // This remember which session is on User through axios !!

export const bus = new Vue();

Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://127.0.0.1:5000",
  })
);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
