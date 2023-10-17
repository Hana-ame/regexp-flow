import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/' , name: 'App', component: () => import('@/views/App.vue') }, 
    // { path: '/flow.html' , name: 'App', component: () => import('@/views/App.vue') }, 
    { path: '/test' , name: 'Test', component: () => import('@/views/Test.vue') }, 
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router 