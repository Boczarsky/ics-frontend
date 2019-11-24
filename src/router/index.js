import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/Login.vue';
import Admin from '../views/admin/Admin.vue';
import Browse from '../views/browse/Browse.vue';
import PageNotFound from '../views/PageNotFound.vue';

import Manage from '../views/manage/Manage.vue';
import MyShops from '../components/manage/my-shops/MyShops.vue';
import ListShops from '../components/manage/my-shops/list-shops/ListShops.vue';
import CreateShop from '../components/manage/my-shops/create-shop/CreateShop.vue';
import EditShop from '../components/manage/my-shops/edit-shop/EditShop.vue';
import TheCoupons from '../components/manage/coupons/TheCoupons.vue';
import MyAccount from '../components/manage/my-account/MyAccount.vue';
import ThePromotions from '../components/manage/promotions/ThePromotions.vue';
import TheEmployees from '../components/manage/employees/TheEmployees.vue';

import { checkIfLoggedIn } from '../utils/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
    children: [
      {
        path: '',
        redirect: 'myShops',
      },
      {
        path: 'myShops',
        name: 'my-shops',
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
            path: 'edit/:id',
            props: true,
            name: 'edit-shop',
            component: EditShop,
          },
        ],
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: TheCoupons,
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
    path: '/',
    name: 'browse',
    component: Browse,
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
