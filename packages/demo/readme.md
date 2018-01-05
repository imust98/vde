# Button

> 按钮，提供几种基础样式和尺寸。

---

## 基础用法

<template>
  <div class="block-group">
    <u-button type="default">default</u-button>
    <u-button type="primary">primary</u-button>
    <u-button type="danger">danger</u-button>
  </div>
</template>

```html
    <u-button type="default">default</u-button>
    <u-button type="primary">primary</u-button>
    <u-button type="danger">danger</u-button>
```
<script>
export default {
  methods:{

  }
};
</script>

## 禁用状态
<template>
<div><u-button type="default" disabled>default</u-button></div>
</template>

```html
    <u-button type="default" disabled>default</u-button>
```

## Attributes

| 参数     | 说明         | 类型    | 可选值                   | 默认值  |
| -------- | ------------ | ------- | ------------------------ | ------- |
| plain    | 幽灵按钮     | Boolean |                          | false   |
| disabled | 禁用状态     | Boolean |                          | false   |
| type     | 按钮显示样式 | String  | default, primary, danger | default |
| size     | 尺寸         | String  | small, normal, large     | normal  |
| icon     | 图标         | String  | more, back               |         |

## Events

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |

## Slot

| name | 描述             |
| ---- | ---------------- |
| -    | 显示的文本内容   |
| icon | 自定义显示的图标 |
