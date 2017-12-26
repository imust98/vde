<template>
  <div class="g-doc">
    <div class="g-head">
      <header>Components Examples</header>
    </div>
    <div class="g-body">
      <div class="g-content">
        <div class="m-side">
          <h3>组件</h3>
          <ul>
              <li v-for="(item,index) in navs" :key="item.path">
                <router-link :to="item.path">{{item.meta.title}}</router-link>
              </li>
          </ul>
        </div>
        <div class="m-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nav from './nav.js';
import '../src/styles/base.scss';
import '../src/styles/common.scss'
export default {
  data() {
    return {
      navs: []
    };
  },
  mounted() {
    this.navs.splice(0, 1, ...nav);
  }
};
</script>
<style lang="scss">

</style>
