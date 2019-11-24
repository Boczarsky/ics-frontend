<template>
  <div class="basic-input">
    <label>{{$t(translatePath)}}</label>
    <input :type="inputType" @input="handleChange"/>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    translatePath: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
  },
};
</script>

<style lang="scss">
@import './basic-input-styles.scss';
</style>
