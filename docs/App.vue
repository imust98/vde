<template>
  <div class="g-doc">
    <div class="g-head">
      <header>Components Docs</header>
    </div>
    <div class="g-body">
      <div class="g-content">
        <div class="m-side">
          <h3>组件</h3>
          <ul>
              <li>
                <router-link to="/button">Button</router-link>
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
</script>
<style lang="scss">
html,
body,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li {
  padding: 0;
  margin: 0;
  color: #555;
}
html,
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  height: 100%;
}
a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
pre {
  background-color: #f8f8f8;
  padding: 20px;
  margin: 1.2em 0;
  overflow: auto;
}
p > code {
  background-color: #eee;
  padding: 2px;
  color: #26a2ff;
}
blockquote {
  margin-bottom: 20px;
}
table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  font-size: 14px;
  margin-bottom: 45px;
  line-height: 1.5em;
  th,
  td {
    text-align: left;
    white-space: nowrap;
    color: #666;
    font-weight: 400;
    border-bottom: 1px solid #d8d8d8;
    padding: 15px;
    max-width: 250px;
  }
}
.g-doc {
  height: 100%;
}
.g-head {
  padding: 30px 0px;
  header {
    width: 1000px;
    margin: 0 auto;
    color: #409eff;
    font-size: 30px;
    line-height: 40px;
  }
}
.g-body {
  height: calc(100% - 100px);
}
.g-content {
  width: 1000px;
  margin: 0 auto;
  position: relative;
  height: 100%;
}
.m-side {
  width: 240px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-right: 1px solid #efefef;
  &::before {
  }
  &::after {
    position: absolute;
    content: '';
    right: -1px;
    bottom: 0px;
    height: 20px;
    width: 1px;
    background: #fff;
  }
  h3 {
    line-height: 40px;
    font-size: 16px;
    color: #333;
  }
  li {
    a {
      display: block;
      height: 40px;
      color: #444;
      line-height: 40px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 400;
      &:hover {
        color: #409eff;
      }
    }
  }
}
.m-main {
  padding-left: 270px;
}
</style>
