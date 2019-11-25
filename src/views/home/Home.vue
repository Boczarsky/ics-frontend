<template>
  <div class="home">
    <div class="side-nav">
        <div class="navigation-link" @click="$router.push('/shops')">
          {{$t('nav.shops')}}
        </div>
        <div class="navigation-link" @click="$router.push('/myAccount')">
          {{$t('nav.myAccount')}}
        </div>
        <div class="navigation-link" @click="$router.push('/promotions')">
          {{$t('nav.promotions')}}
        </div>
        <div
          v-if="userType === 3"
          class="navigation-link"
          @click="$router.push('/employees')"
        >
          {{$t('nav.employees')}}
        </div>
        <div class="navigation-link" @click="handleLogout">
          {{$t('nav.logout')}}
        </div>
    </div>
    <div class="content-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { logout } from '../../utils/auth';

export default {
  methods: {
    handleLogout() {
      const notification = { message: this.$t('notifications.logout'), type: 'info' };
      this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      this.$store.dispatch('user/clearUserData');
      logout();
      this.$router.push('/login');
    },
  },
  computed: {
    ...mapGetters({
      userType: 'user/userType',
    }),
  },
};
</script>

<style lang="scss">
@import './home-styles.scss';
</style>
