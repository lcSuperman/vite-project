import { createWebHashHistory, createRouter } from 'vue-router'

import Login from '@/views/login.vue'
import Frame from '@/views/frame.vue'
import Home from '@/views/home/index.vue'
import one from './mone/one'
import two from './mtwo/two'
import three from './mthree/three'


const routes = [
   {path:'/',redirect:'/login'},
   {path:'/login',name:'login',component:Login},
   {
      path:'/',
      component:Frame,
      children:[
         {
            path:'home',
            name:'home',
            component:Home,
         }
      ]
   },
   {
      path:'/one',
      name:'one',
      component:Frame,
      children:[
         ...one
      ]
   },
   {
      path:'/',
      component:Frame,
      children:[
         ...two
      ]
   },
   {
      path:'/',
      component:Frame,
      children:[
         ...three
      ]
   }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => {
       history.pushState(null, null, document.URL)
    }
})

export default router