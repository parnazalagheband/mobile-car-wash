import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/authentication.vue'),
      children: [
        {
          name: 'login',
          path: '/login',
          component: () => import('@/views/login.vue'),
        },
        {
          name: 'signup',
          path: '/signup',
          component: () => import('@/views/signup.vue'),
        },
      ],
    },
  ]
})

export default router
