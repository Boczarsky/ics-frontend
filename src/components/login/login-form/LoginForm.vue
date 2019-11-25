<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div class="input-wrapper">
      <basic-input
        translatePath="login.usernameInput"
        v-model="username">
      </basic-input>
    </div>
    <div class="input-wrapper">
      <basic-input
        inputType="password"
        translatePath="login.passwordInput"
        v-model="password"
      ></basic-input>
    </div>
    <div class="button-wrapper">
      <basic-button translatePath="login.loginButton"></basic-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import BasicButton from '@/components/common/button/BasicButton.vue';
import BasicInput from '@/components/common/input/BasicInput.vue';
import { login } from '@/utils/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  components: {
    BasicButton,
    BasicInput,
  },
  methods: {
    async handleSubmit() {
      const result = await login(this.username, this.password);
      if (result.success) {
        const notification = { message: this.$t('notifications.loginSucceded'), type: 'info' };
        this.pushNotification({ notification, timeout: 2000 });
        this.$store.dispatch('user/fetchUserData').then(() => {
          this.$router.push('/');
        });
      } else {
        const notification = { message: this.$t('notifications.loginFailed'), type: 'error' };
        this.pushNotification({ notification, timeout: 4000 });
      }
    },
    ...mapActions({
      pushNotification: 'notifications/pushNotification',
    }),
  },
};
</script>

<style lang="scss">
@import './login-form-styles.scss';
</style>
