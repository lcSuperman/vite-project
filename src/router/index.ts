import { createWebHashHistory, createRouter } from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

const routes = [
   {path:'/',redirect:'/login'},
   {path:'/login',name:'login',component:Login},
   {path:'/home',name:'home',component:Home}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => {
       history.pushState(null, null, document.URL)
    }
})

export default router