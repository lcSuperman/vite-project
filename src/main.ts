import { createApp } from 'vue'
import router from './router'
// 引入组件和样式
import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'


import './style.css'
import App from './App.vue'

window.addEventListener('popstate', function() {
  history.pushState(null, null, document.URL)
})

const app = createApp(App)

app.use(router) //和大多数的 Vue 插件一样，use() 需要在 mount() 之前调用
app.use(RouterTab)

app.mount('#app')
 
