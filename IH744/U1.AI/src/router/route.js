// src/routes.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/HomeComponent.vue';
import PostComponent from '../components/PostComponent.vue';
import AboutComponent from '../components/AboutComponent.vue';
import ContactComponent from '../components/ContactComponent.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeComponent,
        meta: { title: 'Inicio' }
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
        name: 'About',
        component: AboutComponent,
        meta: { title: 'Acerca De' }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactComponent,
        meta: { title: 'Contacto' }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : '/',
});

router.beforeEach((to, from, next) => {
    document.title = to.meta?.title  ? `${to.meta.title} - UDG Demo Blog` : 'UDG Demo Blog';
    next();
});

export default router;
