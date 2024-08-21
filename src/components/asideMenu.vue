

<template>
  <div class="logo-contaner">
    <div class="logo">
      <img src="../assets/vue.svg" alt="logo" @click="goHome">
      <div class="container">
        <span v-if="!isCollapse" style="margin-left: 5px;">Vue3 + vite</span>
      </div>
    
    </div>
  </div>
  <div class="menu-container">
    <el-menu
      default-active="2"
      :collapse-transition="false"
      :collapse="isCollapse"
      router
      @select="clickMenu"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="(item , index) in menuList" :key="index">
        <el-sub-menu :index="item.path"  v-if="item.children && item.children.length !== 0">
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="iconMapping[item.icon]" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="(element ,key) in item.children" :key="key">
            <el-sub-menu :index="element.path" v-if="element.children && element.children.length !== 0">
              <template #title><span>{{ element.title }}</span></template>
              <el-menu-item :index="ele.path" v-for="(ele ,i) in element.children" :key="i">{{ ele.title}}</el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="element.path" v-else>{{ element.title}}</el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item :index="item.path" v-else>
          <el-icon v-if="item.icon">
              <component :is="iconMapping[item.icon]" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
  
  <div class="aside-foot" >
    <el-icon v-if="!isCollapse" size="25"  color="#000" @click="foldMenu"><Fold/></el-icon>
    <el-tooltip
        v-else
        offset="30"
        :disabled="isTooltip"
        class="box-item"
        effect="dark"
        content="展开菜单"
        placement="right"
      >
        <el-icon  size="25"  color="#000"  @click="expandMenu"><Expand /></el-icon>
  </el-tooltip>
  </div>
 
</template>

<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { useRouter } from 'vue-router';
import {Expand,Fold} from '@element-plus/icons-vue'
import iconMapping  from '@/assets/el-icon'

// 获取router实例
const router = useRouter();
const props = defineProps(['changeWidth'])
const isCollapse = ref(false)
const isTooltip = ref(true) //因为菜单折叠用了动画过度，折叠时会显示文字提醒，利用disabled属性，延时生效，避免点击时就出现文字提醒
const menuList = reactive([
  {
    title:'菜单一',
    path:'one',
    icon:'coin',
    children:[
      {title:'子菜单一',path:'/one/one_one'},
      {title:'子菜单二',path:'/one/one_two'},
    ]
  },
  {
    title:'菜单二',
    path:'/two',
    icon:'coin',
  },
  {
    title:'菜单三',
    path:'/three',
    icon:'coin',
  }

])

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath)
}

const foldMenu = () => {
  isCollapse.value = true
  setTimeout(() => {
    isTooltip.value = false
  })
  props.changeWidth(65)
}

const expandMenu = () => {
  isCollapse.value = false
  isTooltip.value = true
  props.changeWidth(160)
}

const clickMenu = (a:any,b:any,c:any,d:any) => {
 // console.log('22222222222222',a,b,c,d)
}

const goHome = () => {
  router.push({path:'/home'})
}

</script>

<style lang="less" scoped>
.logo-contaner{
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo{
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
      cursor: pointer;
    }
    .container span {
      white-space: nowrap; /* 防止文本换行 */
    }
  }
}
.menu-container{
  overflow: auto;
  height:calc(100% - 100px);
  overflow-x: hidden; /*菜单展开时会闪一下滚动条， 隐藏横向滚动条 */
  .el-menu{
    width:100%;
    border-right:none;
    .el-menu-item-group__title{
      padding:0px;
    }
  }
}
.aside-foot{
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .el-icon{
     cursor: pointer;
  }
}

</style>
