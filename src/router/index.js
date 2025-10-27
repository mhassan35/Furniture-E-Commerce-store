import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import MyShop from '@/components/features/Shop/MyShop.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/shop',
    name: 'Shop',
    component: MyShop
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
