import { createWebHashHistory, createRouter } from 'vue-router'

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
      path:'/home',
      component:Frame,
      children:[
         {
            path:'',
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
   const loginInfo = JSON.parse(sessionStorage.getItem('userInfo')) 
   if(to.name == 'login' || (loginInfo &&  loginInfo.userName == 'lulingfeng' && loginInfo.passWord == 'QAZwsx123')){
      next()
   }else{
       next({ name: 'login' })
   }
   
 })

export default router