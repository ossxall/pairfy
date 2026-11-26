import { createRouter, createWebHistory } from 'vue-router'
import FeedHome from './views/FeedHome.vue'
import PostDetail from './views/PostDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FeedHome,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostDetail,
    },
  ],
})

export default router
