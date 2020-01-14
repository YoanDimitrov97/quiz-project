import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true; // This remember which session is on User through axios !!

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
