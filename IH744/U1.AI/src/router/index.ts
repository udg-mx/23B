import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostComponent from "@/components/PostComponent.vue";
import AdminView from "@/views/AdminView.vue";
import AdminPostEditView from "@/views/AdminPostEditView.vue";
import AdminPostNewView from "@/views/AdminPostNewView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin/posts',
      name: 'adminPosts',
      component: AdminView
    },
    {
      path: '/admin/posts/new',
      name: 'adminPostsNew',
      component: AdminPostNewView
    },
    {
      path: '/admin/posts/:id/edit',
      name: 'adminPostsEdit',
      component: AdminPostEditView,
      props: true,
      meta: { title: 'Editar Post' }
    },
    {
      path: '/admin/posts/:id/delete',
      name: 'adminPostsDelete',
      component: AdminView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostComponent,
      props: true,
      meta: { title: 'Detalle del Post' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
  ]
})

export default router
