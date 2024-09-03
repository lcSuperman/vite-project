import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from './router'
import clickOutside from '@/utils/directives/clickOutside.ts';
import '@/mock/index.ts'

import './style.css'
import App from './App.vue'

window.addEventListener('popstate', function() {
  history.pushState(null, null, document.URL)
})



const pinia = createPinia()
pinia.use(piniaPluginPersist)
const app = createApp(App)
app.directive('clickOutside', clickOutside);

app.use(pinia)
app.use(router) //和大多数的 Vue 插件一样，use() 需要在 mount() 之前调用
app.mount('#app')
 
