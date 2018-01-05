import Vue from 'vue';
import router from './router';
import App from './App.vue';
import 'highlight.js/styles/vs2015.css';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
