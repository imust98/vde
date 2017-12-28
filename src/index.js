
import button from '../packages/button/index.vue';
import select from '../packages/select/index.vue';
import select2 from '../packages/select2/index.vue';
import select3 from '../packages/select3/index.vue';
import select4 from '../packages/select4/index.vue';
import select5 from '../packages/select5/index.vue';
import select6 from '../packages/select6/index.vue';

const install = function(Vue, config = {}) {
  Vue.component(button.name, button);
  Vue.component(select.name, select);
  Vue.component(select2.name, select2);
  Vue.component(select3.name, select3);
  Vue.component(select4.name, select4);
  Vue.component(select5.name, select5);
  Vue.component(select6.name, select6);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  button,
  select,
  select2,
  select3,
  select4,
  select5,
  select6
};