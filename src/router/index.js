import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '../views/MainContent.vue';
import ArticleDetail from '../views/ArticleDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainContent,
    },
    {
      path: '/article/:slug',
      name: 'ArticleDetail',
      component: ArticleDetail,
      props: true,
    },
  ]
})

export default router
