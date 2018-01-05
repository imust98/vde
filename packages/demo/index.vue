<template>
  <button :type="htmlType" :class="classes" :disabled="disabled" :style="styles" @click="handleClick">
    <span><slot></slot></span>
  </button>
</template>
<script>
const prefixCls = 'u-btn';
export default {
  name: 'UButton',
  props: {
    htmlType: {
      default: 'button'
    },
    disabled: {
      default: false
    },
    size: {
      default: 'large'
    },
    type: {
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-${this.size}`]: !!this.size
        }
      ];
    },
    styles() {
      return [];
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    }
  },
  mounted() {
    // todo
  }
};
</script>
<style lang="scss" scoped>
@import '../../src/styles/custom.scss';
.u-btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $text-white-color;
  border: 1px solid $border-base-color;
  color: $text-color;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    color: $primary-color;
    border-color: $border-base-hover;
    background-color: $btn-base-background;
  }
  &:active {
    color: $btn-primary-active;
    border-color: $btn-primary-active;
    outline: none;
  }

  &-primary {
    color: $btn-base-color;
    background-color: $btn-primary-color;
    border-color: $btn-primary-color;
    &:hover {
      color: $btn-base-color;
      background: $btn-primary-hover;
      border-color: $btn-primary-hover;
    }
    &:active {
      color: $btn-base-color;
      background: $btn-primary-active;
      border-color: $btn-primary-active;
    }
  }
  &-success {
    color: $btn-base-color;
    background-color: $btn-success-color;
    border-color: $btn-success-color;
    &:hover {
      color: #fff;
      background: $btn-success-hover;
      border-color: $btn-success-hover;
    }
  }
  &-info {
    color: $btn-base-color;
    background-color: $btn-info-color;
    border-color: $btn-info-color;
    &:hover {
      color: $btn-base-color;
      background: $btn-info-hover;
      border-color: $btn-info-hover;
    }
  }
  &-warning {
    color: $btn-base-color;
    background-color: $btn-warning-color;
    border-color: $btn-warning-color;
    &:hover {
      color: $btn-base-color;
      background: $btn-warning-hover;
      border-color: $btn-info-hover;
    }
  }
  &-danger {
    color: $btn-base-color;
    background-color: $btn-danger-color;
    border-color: $btn-danger-color;
    &:hover {
      color: $btn-base-color;
      background: $btn-danger-hover;
      border-color: $btn-danger-hover;
    }
  }
  &-text {
    border: none;
    color: $text-color;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
    &:hover {
      color: $primary-color;
      border-color: transparent;
      background-color: transparent;
    }
  }
  &-large {
    padding: 12px 20px;
  }
  &-small {
    padding: 3px 5px;
    font-size: 12px;
  }
  &[disabled] {
    color: $input-disabled-text;
    cursor: not-allowed;
    background-image: none;
    background-color: $text-white-color;
    border-color: $input-disabled-border;
    &:hover {
      color: $input-disabled-text;
      background-color: $text-white-color;
      border-color: $input-disabled-border;
    }
  }
}
</style>
