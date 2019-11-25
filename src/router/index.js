import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/Login.vue';
import Home from '../views/home/Home.vue';
import PageNotFound from '../views/PageNotFound.vue';

import MyShops from '../components/shops/MyShops.vue';
import ListShops from '../components/shops/list-shops/ListShops.vue';
import CreateShop from '../components/shops/create-shop/CreateShop.vue';
import ViewShop from '../components/shops/view-shop/ViewShop.vue';
import MyAccount from '../components/my-account/MyAccount.vue';
import ThePromotions from '../components/promotions/ThePromotions.vue';
import TheEmployees from '../components/employees/TheEmployees.vue';

import { checkIfLoggedIn } from '../utils/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'shops',
      },
      {
        path: 'shops',
        name: 'shops',
        component: MyShops,
        children: [
          {
            path: '',
            name: 'list-shops',
            component: ListShops,
          },
          {
            path: 'create',
            name: 'create-shop',
            component: CreateShop,
          },
          {
            path: 'view/:id',
            props: true,
            name: 'view-shop',
            component: ViewShop,
          },
          {
            path: 'edit/:id',
            props: true,
            name: 'edit-shop',
            component: CreateShop,
          },
        ],
      },
      {
        path: 'myAccount',
        name: 'my-account',
        component: MyAccount,
      },
      {
        path: 'promotions',
        name: 'promotions',
        component: ThePromotions,
      },
      {
        path: 'employees',
        name: 'employees',
        component: TheEmployees,
      },
    ],
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (checkIfLoggedIn()) {
    next();
  } else if (to.path === '/login') {
    next();
  } else {
    next('/login');
  }
});

export default router;
