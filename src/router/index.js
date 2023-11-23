import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import AIView from '../views/AIView.vue'
import GeoView from '../views/GeoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      props: true
    },
    {
      path: '/ai',
      name: 'ai',
      component: AIView
    },
    {
      path: '/geo',
      name: 'geo',
      component: GeoView
    }
  ]
})

export default router

