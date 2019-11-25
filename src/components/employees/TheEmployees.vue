<template>
  <div class="employees">
    <h1>Pracownicy</h1>
    <table width="100%" style="text-align: center">
      <thead>
        <th>ID</th>
        <th>Imie</th>
        <th>Nazwisko</th>
        <th>Login</th>
        <th>Email</th>
        <th>Pracuje w</th>
      </thead>
      <tr v-for="employee in employees" :key="`e${employee.user_id}`">
        <td>{{employee.user_id}}</td>
        <td>{{employee.first_name}}</td>
        <td>{{employee.last_name}}</td>
        <td>{{employee.login}}</td>
        <td>{{employee.email}}</td>
        <td>{{employee.workplaces.map(workplace => workplace.name).join(', ')}}</td>
      </tr>
    </table>
    <form @submit.prevent="handleCreateEmployee">
      <input name="firstName" type="text" placeholder="Imie">
      <input name="lastName" type="text" placeholder="Nazwisko">
      <input name="login" type="text" placeholder="Login">
      <input name="email" type="text" placeholder="Email">
      <input name="password" type="password" placeholder="Hasło">
      <input type="submit" placeholder="Imie">
    </form>
    <form @submit.prevent="handleAction">
      <h1>Przypisz/Wypisz Pracownika</h1>
      <select name="action">
        <option value="assign">Przypisz do lodziarni</option>
        <option value="unassign">Wypisz z lodziarni</option>
      </select>
      <select name="employee">
        <option
          v-for="employee in employees"
          :key="`option${employee.user_id}`"
          :value="employee.user_id"
        >
          {{employee.full_name}}
        </option>
      </select>
      <select name="icecreamShop">
        <option
          v-for="icecreamShop in icecreamShops"
          :key="`option${icecreamShop.id}`"
          :value="icecreamShop.id"
        >
          {{icecreamShop.name}}
        </option>
      </select>
      <input type="submit" value="Zastosuj">
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  createEmployee,
  fetchEmployees,
  assignEmployee,
  unassignEmployee,
} from './requests';

export default {
  async mounted() {
    const result = await fetchEmployees();
    this.employees = result.result;
  },
  data() {
    return {
      employees: [],
    };
  },
  computed: {
    ...mapGetters({
      icecreamShops: 'user/icecreamShops',
    }),
  },
  methods: {
    async handleCreateEmployee({ target }) {
      const {
        firstName,
        lastName,
        login,
        email,
        password,
      } = target.elements;
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        login: login.value,
        email: email.value,
        password: password.value,
      };
      const response = await createEmployee(data);
      if (response) {
        const result = await fetchEmployees();
        this.employees = result.result;
        firstName.value = '';
        lastName.value = '';
        login.value = '';
        password.value = '';
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    handleAction({ target }) {
      const {
        action,
        employee,
        icecreamShop,
      } = target.elements;
      const employeeId = +employee.value;
      const icecreamShopId = +icecreamShop.value;
      const data = {
        employeeId,
        icecreamShopId,
      };
      switch (action.value) {
        case 'assign':
          this.handleAssignEmployee(data);
          break;
        case 'unassign':
          this.handleUnassignEmployee(data);
          break;
        default:
      }
    },
    async handleAssignEmployee(data) {
      const response = await assignEmployee(data);
      if (response) {
        const result = await fetchEmployees();
        this.employees = result.result;
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    async handleUnassignEmployee(data) {
      const response = await unassignEmployee(data);
      if (response) {
        const result = await fetchEmployees();
        this.employees = result.result;
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
  },
};
</script>
