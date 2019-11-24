<template>
  <div id="app">
    <notification-container></notification-container>
    <router-view/>
  </div>
</template>

<script>
import NotificationContainer from '@/components/common/notification/NotificationContainer.vue';

export default {
  mounted() {
    this.$store.dispatch('user/fetchUserData');
  },
  components: {
    NotificationContainer,
  },
};
</script>

<style lang="scss">
@import './styles.scss';
</style>
