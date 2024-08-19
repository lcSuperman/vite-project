# Vue@3.4 + TypeScript@5.2 + Vite@5.3 + vue-router@4

## 1.问题一，路由设置好了模版也有 < router-view >< /router-view >，但是页面不显示；
   app.use(router) //和大多数的 Vue 插件一样，use() 需要在 mount() 之前调用
   app.mount('#app')
   .use()要写在.mount()之前

## 2.问题二，登录表单写好了，结果表单input框不能输入
  < el-form >的表单ref的值不能和model的值一样

## 3.组件内使用编程式导航路由跳转
   import { useRouter } from 'vue-router'; //先引入
   const router = useRo // 获取router实例
   router.push({path:'/home'})

## 4.模版引入，模版使用ref操作DOM
   模版中定义ref的值 'ruleFormRef'
   const ruleFormRef = ref()  //定义的名字要和模版中ref的名称一致
   ruleFormRef.value.XX()  //使用

## 5.问题三，通过程式导航路由跳转，路由跳转成功了，但是地址栏的路由地址没有改变
    将Vue Router的模式切换成hash模式，在hash模式下，路由跳转回通过改变url的哈希值来实现，因此地址栏url会随着路由的改变而改变；
    import { createWebHashHistory, createRouter } from 'vue-router'
    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    })

## 6.阻止浏览器箭头默认退回前进事件
   1、main.ts中设置监听：
      window.addEventListener('popstate', function() {
         history.pushState(null, null, document.URL)
      })
   2、在router的index.ts中
      const router = createRouter({
         history: createWebHashHistory(),
         routes,
         scrollBehavior: () => { //添加scrollBehavior函数
            history.pushState(null, null, document.URL)
         }
      })