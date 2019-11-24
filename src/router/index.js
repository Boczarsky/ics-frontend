import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import { checkIfLoggedIn } from '../utils/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (checkIfLoggedIn() || to.name === 'login') {
    next();
  }
  if (from.name !== 'login') {
    next({ name: 'login' });
  }
});

export default router;
