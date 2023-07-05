import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import DetailPage from '../components/DetailPage.vue'
import WishlistPage from '../components/WishlistPage.vue'
import TicketPage from '../components/TicketPage.vue'
import coba from '../components/coba.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/view-detail/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistPage
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketPage
    }

  ]
})

export default router
