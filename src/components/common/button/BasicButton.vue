<template>
  <div class="basic-button">
    <button @click="handleClick">{{$t(translatePath)}}</button>
  </div>
</template>
<script>
export default {
  props: {
    translatePath: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit('buttonClick');
    },
  },
};
</script>

<style lang="scss">
@import './basic-button-styles.scss';
</style>
