<template>
  <div class="promotions">
    <div class="coupons-list" v-if="userType === 1">
      <h1>Moje kupony</h1>
      <table class="coupons-table">
        <thead>
          <th>Numer kuponu</th>
          <th>Numer promocji</th>
          <th>Punkty</th>
          <th>Nagroda</th>
          <th>Info</th>
          <th>Od</th>
          <th>Do</th>
        </thead>
        <tr v-for="coupon in coupons" :key="`coupon${coupon.coupon_id}`">
          <td>{{coupon.coupon_id}}</td>
          <td>{{coupon.promotion_id}}</td>
          <td>{{coupon.count}} / {{coupon.promotion.limit}}</td>
          <td>{{coupon.promotion.prize}}</td>
          <td>{{coupon.promotion.info}}</td>
          <td>{{coupon.promotion.start_date}}</td>
          <td>{{coupon.promotion.end_date}}</td>
        </tr>
      </table>
    </div>
    <div class="promotions-list" v-if="[3].includes(userType)">
      <h1>Moje promocje</h1>
      <table class="coupons-table">
        <thead>
          <th>Numer promocji</th>
          <th>Limit</th>
          <th>Nagroda</th>
          <th>Info</th>
          <th>Od</th>
          <th>Do</th>
        </thead>
        <tr v-for="promotion in promotions" :key="`promotion${promotion.promotion_id}`">
          <td>{{promotion.promotion_id}}</td>
          <td>{{promotion.limit}}</td>
          <td>{{promotion.prize}}</td>
          <td>{{promotion.info}}</td>
          <td>{{promotion.start_date}}</td>
          <td>{{promotion.end_date}}</td>
        </tr>
      </table>
    </div>
    <template v-if="userType === 2 || userType === 3">
      <h1>Nabij punkty</h1>
      <form @submit.prevent="handleReward">
        <input name="couponId" type="number">
        <input type="submit" value="nabij">
      </form>
      <h1>Zrealizuj kupon</h1>
      <form @submit.prevent="handleRedeem">
        <input name="couponId" type="number">
        <input type="submit" value="zrealizuj">
      </form>
    </template>
    <template v-if="userType === 3">
      <h1>Nowa promocja</h1>
      <form @submit.prevent="handleCreatePromotion">
        <input name="info" type="text" placeholder="opis promocji">
        <input name="limit" type="number" placeholder="limit punktów">
        <input name="prize" type="text" placeholder="nagroda">
        <input name="startDate" type="date" placeholder="start promocji">
        <input name="endDate" type="date" placeholder="koniec promocji">
        <input type="submit" value="utwórz">
      </form>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  fetchCoupons,
  fetchPromotions,
  couponReward,
  couponRedeem,
  createPromotion,
} from './requests';

export default {
  async mounted() {
    if (this.userType === 1) {
      const couponsResponse = await fetchCoupons();
      this.coupons = couponsResponse.result;
    }
    if (this.userType === 3) {
      const promotionsResponse = await fetchPromotions();
      this.promotions = promotionsResponse.result;
    }
  },
  data() {
    return {
      coupons: [],
      promotions: [],
    };
  },
  computed: {
    ...mapGetters({
      userType: 'user/userType',
    }),
  },
  methods: {
    async handleReward({ target }) {
      const input = target.elements.couponId;
      const result = await couponReward({ couponId: +input.value });
      if (result) {
        const notification = { message: 'Nabito punkt', type: 'info' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      } else {
        const notification = { message: 'Nie można nabić punktu', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
      input.value = '';
    },
    async handleRedeem({ target }) {
      const input = target.elements.couponId;
      const result = await couponRedeem({ couponId: +input.value });
      if (result) {
        const notification = { message: 'Zrealizowano kupon', type: 'info' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      } else {
        const notification = { message: 'Nie można zrealizować kuponu', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
      input.value = '';
    },
    async handleCreatePromotion({ target }) {
      const {
        info,
        limit,
        prize,
        startDate,
        endDate,
      } = target.elements;
      const data = {
        info: info.value,
        limit: +limit.value,
        prize: prize.value,
        startDate: new Date(startDate.value).toISOString(),
        endDate: new Date(endDate.value).toISOString(),
      };
      const result = await createPromotion(data);
      if (result) {
        const promotionsResponse = await fetchPromotions();
        this.promotions = promotionsResponse.result;
      } else {
        const notification = { message: 'Nie można utworzyć promocji', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
  },
};
</script>

<style lang="scss">
.coupons-list {
  width: 100%;
}
.coupons-table {
  width: 100%;
  text-align: center;
}
</style>
