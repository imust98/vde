import Vue from 'vue';
import router from './router';
import App from './App.vue';
import Button from '../packages/button/index.vue';
import 'highlight.js/styles/vs2015.css';

Vue.component('u-button', Button);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
