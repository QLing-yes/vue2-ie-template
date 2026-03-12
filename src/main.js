import './plugins/ie-polyfill';
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
