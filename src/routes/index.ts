import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Homepage.vue' 
import UploadPage from '../pages/UploadPage.vue'

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
    }


  ]
})

export default router