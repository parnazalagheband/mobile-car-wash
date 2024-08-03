import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/authentication.vue'
import Login from '../views/login.vue'
import UserSignup from '../views/signup-user.vue'
import WorkerSignup from '../views/signup-worker.vue'
import Forgetpassword from '../views/forget-password.vue'
import Home from '../views/home.vue'
import AboutUs from '../views/about-us.vue'
import ContactUs from '../views/contact-us.vue'
import Services from '../views/services.vue'
import Dashboard from '../views/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        isProtected: true,
      },
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUs
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUs
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: Auth,
      children: [
        {
          path: "/authentication/login",
          name: "login",
          component: Login,
        },
        {
          path: "/authentication/user-signup",
          name: "user-signup",
          component: UserSignup,
        },
        {
          path: "/authentication/worker-signup",
          name: "worker-signup",
          component: WorkerSignup,
        },
        {
          path: "/authentication/forgetpassword",
          name: "forgetpassword",
          component: Forgetpassword,
        },

      ],
    }
  ]
})

router.beforeEach((to) => {
  const { isProtected } = to.meta;
  if (isProtected && !Cookies.get("token")) {
    return "/authentication/login";
  }
});

export default router
