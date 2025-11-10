import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/childone/:pathMatch(.*)*',
      name: 'childone',
      component: () => import('../views/MicroApp.vue'),
    },
    {
      path: '/childtwo/:pathMatch(.*)*',
      name: 'childtwo',
      component: () => import('../views/MicroApp.vue'),
    },
  ],
});

export default router;

