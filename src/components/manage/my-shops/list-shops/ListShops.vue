<template>
  <div class="list-shops">
    <basic-button
      v-if="userType === 3"
      @buttonClick="handleCreateNew"
      translatePath="manage.buttons.createNew"
    ></basic-button>
    <table>
      <thead>
        <th>ID</th>
        <th>Nazwa</th>
        <th>Ulica</th>
        <th>Kod pocztowy</th>
        <th>Miasto</th>
      </thead>
      <tr
        v-for="icecreamShop in icecreamShops"
        :key="icecreamShop.icecream_shop_id"
        @click="$router.push(`myShops/edit/${icecreamShop.icecream_shop_id}`)"
      >
        <td>{{icecreamShop.icecream_shop_id}}</td>
        <td>{{icecreamShop.name}}</td>
        <td>{{icecreamShop.stret}}</td>
        <td>{{icecreamShop.postal_code}}</td>
        <td>{{icecreamShop.city}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BasicButton from '../../../common/button/BasicButton.vue';
import { fetchIcecreamShops } from '../requests';

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
      let filters;
      if (this.userType === 2) {
        filters = { limit: 100, offset: 0, employeeId: this.userId };
      } else {
        filters = { limit: 100, offset: 0, managerId: this.userId };
      }
      const { result } = await fetchIcecreamShops(filters);
      this.icecreamShops = result;
    },
    handleCreateNew() {
      this.$router.push('myShops/create');
    },
  },
  components: {
    BasicButton,
  },
};
</script>
