import Vue from 'vue';
import router from './router';
import App from './App.vue';
import 'highlight.js/styles/vs2015.css';

import test2 from '../packages/test2/index.vue';
import test3 from '../packages/test3/index.vue';

Vue.component(test2.name, test2);
Vue.component(test3.name, test3);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
