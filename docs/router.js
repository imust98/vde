import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

Vue.use(VueRouter);

import routes from './nav.js';
const router = new VueRouter({ mode: 'history', routes });
const originalTitle = '组件文档';
router.afterEach(route => {
  document.title = route.meta.title
    ? `${route.meta.title} - ${originalTitle}`
    : originalTitle;
});

export default router;
