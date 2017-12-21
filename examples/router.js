import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

Vue.use(VueRouter);

import Button from '../packages/button/example.vue';

const routes = [
  {
    path: '/',
    redirect: '/index',
    meta: {
      title: ''
    }
  },
  {
    path: '/button',
    name: 'nav',
    component: Button,
    meta: {
      title: '按钮组件'
    }
  }
];
const router = new VueRouter({ mode: 'history', routes });
const originalTitle = '组件库';
router.afterEach(route => {
  document.title = route.meta.title
    ? `${route.meta.title} - ${originalTitle}`
    : originalTitle;
});

export default router;
