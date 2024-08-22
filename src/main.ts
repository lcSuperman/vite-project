import { createApp } from 'vue'
import router from './router'



import './style.css'
import App from './App.vue'

window.addEventListener('popstate', function() {
  history.pushState(null, null, document.URL)
})

const app = createApp(App)

app.use(router) //和大多数的 Vue 插件一样，use() 需要在 mount() 之前调用
app.mount('#app')
 
