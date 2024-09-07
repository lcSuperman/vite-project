import { createWebHashHistory, createRouter } from 'vue-router'
import {useRouteTabsStore,useUserInfo} from '@/store/index.ts'

// 引入布局框架组件
const Frame = () => import('@/views/layout/frame.vue')

//动态引入路由组件
const Login = () => import('@/views/login.vue')
const Home = () => import('@/views/home/index.vue')

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
            meta: {
               title: '首页', // 页签标题
               keepAlive:false,
            }
         }
      ]
   },
   {
      path:'/one',
      name:'one',
      component:Frame,
      meta:{
          title: '菜单一'
      },
      children:[
         ...one
      ]
   },
   {
      path:'/two',
      component:Frame,
      children:[
         ...two
      ]
   },
   {
      path:'/three',
      component:Frame,
      children:[
         ...three
      ]
   },
   {
      // 其他路由 404
      path: '/:catchAll(.*)',
      redirect: '/404'
   },
   {
   // 其他路由 404
   path: '/',
   component:Frame,
   children:[
      {
         path: '404',
         component:() => import('@/views/404/index.vue'),
         meta:{
            title:'404'
         }
      }
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

//路由守卫
router.beforeEach((to, from, next) => {
   const route_teabs = useRouteTabsStore()
   const user_info = useUserInfo()
    const obj ={
         path:to.path,
         meta:to.meta
   }
   if(to.name == 'login' || user_info.loginInfo.token){
      if(to.name !== 'login' && to.name !== 'home'){
         route_teabs.addTabs(obj)
      }
      next()
   }else{
       next({ name: 'login' })
   }
   
 })

export default router