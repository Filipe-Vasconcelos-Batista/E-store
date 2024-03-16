import { createRouter, createWebHistory } from 'vue-router';
import Cart from '@/views/CartView.vue';
import Catalog from '../views/CatalogView.vue';
import Details from '../views/DetailView.vue';
import FavoriteView from '../views/FavoriteView.vue';
import CheckOut from '../views/CheckOut.vue';
import ErrorViewVue from '../views/ErrorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: Details
    },
    {
      path: '/cart',
      name: 'cartView',
      component: Cart
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoriteView
    },
    {
      path: '/CheckOut',
      name: 'CheckOut',
      component: CheckOut
    },
    { path: '/:notFound', name: 'notFound', component: ErrorViewVue }
  ]
});

export default router;
