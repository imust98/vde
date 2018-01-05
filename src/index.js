
import test2 from '../packages/test2/index.vue';
import test3 from '../packages/test3/index.vue';

const install = function(Vue, config = {}) {
  Vue.component(test2.name, test2);
  Vue.component(test3.name, test3);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  test2,
  test3
};