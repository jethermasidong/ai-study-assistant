import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Homepage.vue';
import UploadPage from '../pages/UploadPage.vue';
import ExamPage from '../pages/ExamPage.vue';
import SummaryPage from '../pages/SummaryPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/upload-page',
      name: 'upload',
      component: UploadPage
    },

    {
      path: '/examination-page',
      name: 'examination',
      component: ExamPage
    },

    {
      path: '/summary-page',
      name: 'summary',
      component: SummaryPage  
    }


  ]
})

export default router