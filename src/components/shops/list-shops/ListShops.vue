<template>
  <div class="list-shops">
    <basic-button
      v-if="userType === 3"
      @buttonClick="handleCreateNew"
      translatePath="buttons.createNew"
    ></basic-button>
    <table class="icecream-shops-table">
      <thead>
        <th></th>
        <th>Nazwa</th>
        <th>Ulica</th>
        <th>Kod pocztowy</th>
        <th>Miasto</th>
      </thead>
      <tr
        v-for="icecreamShop in icecreamShops"
        :key="icecreamShop.icecream_shop_id"
        @click="$router.push(`shops/view/${icecreamShop.icecream_shop_id}`)"
        class="icecream-shop-row"
      >
        <td class="logo-column">
          <img
            class="logo-image"
            :src="getLogoUrl(icecreamShop.logo_file_name)"
            v-if="icecreamShop.logo_file_name"
          />
          <div class="logo-placeholder" v-if="!icecreamShop.logo_file_name"></div>
        </td>
        <td>{{icecreamShop.name}}</td>
        <td>{{icecreamShop.street}}</td>
        <td>{{icecreamShop.postal_code}}</td>
        <td>{{icecreamShop.city}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BasicButton from '../../common/button/BasicButton.vue';
import { fetchIcecreamShops } from '../requests';
import { composeSecureUrl } from '../../../utils/common';

export default {
  async mounted() {
    this.fetchIcecreamShops();
  },
  data() {
    return {
      icecreamShops: [],
    };
  },
  computed: {
    ...mapGetters({
      userType: 'user/userType',
      userId: 'user/userId',
    }),
  },
  methods: {
    async fetchIcecreamShops() {
      const filters = { limit: 100, offset: 0 };
      if (this.userType === 2) {
        filters.employeeId = this.userId;
      } else if (this.userType === 3) {
        filters.managerId = this.userId;
      }
      const { result } = await fetchIcecreamShops(filters);
      this.icecreamShops = result;
    },
    handleCreateNew() {
      this.$router.push('shops/create');
    },
    getLogoUrl(fileName) {
      return composeSecureUrl(fileName);
    },
  },
  components: {
    BasicButton,
  },
};
</script>

<style lang="scss">
@import './list-shops-styles.scss';
</style>
