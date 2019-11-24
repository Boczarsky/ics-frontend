<template>
  <div class="manage">
    <div class="side-nav">
        <div class="navigation-link" @click="$router.push('/manage/myShops')">
          {{$t('manage.nav.myShops')}}
        </div>
        <div class="navigation-link" @click="$router.push('/manage/coupons')">
          {{$t('manage.nav.coupons')}}
        </div>
        <div class="navigation-link" @click="$router.push('/manage/myAccount')">
          {{$t('manage.nav.myAccount')}}
        </div>
        <div class="navigation-link" @click="$router.push('/manage/promotions')">
          {{$t('manage.nav.promotions')}}
        </div>
        <div
          v-if="userType === 3"
          class="navigation-link"
          @click="$router.push('/manage/employees')"
        >
          {{$t('manage.nav.employees')}}
        </div>
        <div class="navigation-link" @click="handleLogout">
          {{$t('manage.nav.logout')}}
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
@import './manage-styles.scss';
</style>
