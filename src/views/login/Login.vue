<template>
  <div class="login">
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/login/login-form/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
  @import './login-styles.scss';
</style>
