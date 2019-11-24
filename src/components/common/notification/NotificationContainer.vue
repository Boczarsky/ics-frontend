<template>
  <div class="notification-container">
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      :class="`${notification.type} notification`"
    >
      {{notification.message}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
    }),
  },
};
</script>

<style lang="scss">
@import './notification-container-styles.scss';
</style>
