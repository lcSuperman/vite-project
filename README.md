# Vue@3.4 + TypeScript@5.2 + Vite@5.3 + vue-router@4

## 1. 问题一，路由设置好了模版也有 < router-view >< /router-view >，但是页面不显示；
   app.use(router) //和大多数的 Vue 插件一样，use() 需要在 mount() 之前调用
   app.mount('#app')
   .use()要写在.mount()之前

## 2. 问题二，登录表单写好了，结果表单input框不能输入
  < el-form >的表单ref的值不能和model的值一样

## 3. 组件内使用编程式导航路由跳转
   import { useRouter } from 'vue-router'; //先引入
   const router = useRo // 获取router实例
   router.push({path:'/home'})

## 4. 模版引入，模版使用ref操作DOM
   模版中定义ref的值 'ruleFormRef'
   const ruleFormRef = ref()  //定义的名字要和模版中ref的名称一致
   ruleFormRef.value.XX()  //使用

## 5. 问题三，通过程式导航路由跳转，路由跳转成功了，但是地址栏的路由地址没有改变
    将Vue Router的模式切换成hash模式，在hash模式下，路由跳转回通过改变url的哈希值来实现，因此地址栏url会随着路由的改变而改变；
    import { createWebHashHistory, createRouter } from 'vue-router'
    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    })

## 6. 阻止浏览器箭头默认退回前进事件
   1. main.ts中设置监听：
    " window.addEventListener('popstate', function() {
         history.pushState(null, null, document.URL)
      }) "
   2. 在router的index.ts中
     ` const router = createRouter({
         history: createWebHashHistory(),
         routes,
         scrollBehavior: () => { //添加scrollBehavior函数
            history.pushState(null, null, document.URL)
         }
      })`

## 7. 直接使用element-ui plus的菜单折叠组件，折叠时，菜单消失会有明显卡顿，体验不好！
   1. 关闭菜单折叠动画  :collapse-transition="false"；  .el-menu的width宽为100%；
   2. 给菜单父容器元素el-aside，添加过度动画 transition: width 0.1s ease-in-out;
   3. 此时菜单在展开时，会在边菜单栏下面闪一下横向滚动条，我们可以在.el-aside样式加上 overflow-x: hidden，隐藏掉，就不会闪现滚动条了

## 8. elemnt-ui plus的el-icon在菜单中的遍历渲染展示，由于icon是以组件形式HTML标签渲染，所以是个问题；
   1. 我们可以利用动态组件的形式取渲染，让icon以HTML标签形式渲染；
     ` <el-icon v-if="item.icon">
         <component :is="iconMapping[item.icon]" />
      </el-icon>`
   2. 单独创建一个公共的el-icon的ts映射文件，因为后端传过来的都是字符串，所以我们要取取对应的值；assets/el-icon.ts
     ` import {Coin,DataAnalysis} from '@element-plus/icons-vue'
      export default  {
         "coin": Coin,
         "dataAnalysis": DataAnalysis,
      }`
    