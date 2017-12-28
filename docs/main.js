import Vue from 'vue';
import router from './router';
import App from './App.vue';
import 'highlight.js/styles/vs2015.css';

import button from '../packages/button/index.vue';

Vue.component(button.name, button);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
