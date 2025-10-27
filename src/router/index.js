import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import MyShop from '@/components/features/Shop/MyShop.vue'
import BlogPage from '@/components/BlogPage.vue'
import ContactPage from '@/components/ContactPage.vue'
import CartPage from '@/components/CartPage.vue'

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
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
