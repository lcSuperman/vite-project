

<template>
  <div class="logo-contaner">
    <div class="logo">
      <img src="../assets/vue.svg" alt="logo">
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
      :popper-class="'custom-menu-popper'"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="(item , index) in menuList" :key="index">
        <el-sub-menu :index="item.code"  v-if="item.children && item.children.length !== 0">
          <template #title>
            <el-icon><Coin /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="(element ,key) in item.children" :key="key">
            <el-sub-menu :index="element.code" v-if="element.children && element.children.length !== 0">
              <template #title><span>{{ element.title }}</span></template>
              <el-menu-item :index="ele.code" v-for="(ele ,i) in element.children" :key="i">{{ ele.title}}</el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="element.code" v-else>{{ element.title}}</el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item :index="item.code" v-else>
          <el-icon><Coin /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>

      </template>
    
   
      <!-- <el-menu-item index="3">
        <el-icon><Coin /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Coin /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><Coin /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item> -->
    
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
import { Fold,Expand,Coin} from '@element-plus/icons-vue';  

const props = defineProps(['changeWidth'])
const isCollapse = ref(false)
const isTooltip = ref(true) //因为菜单折叠用了动画过度，折叠时会显示文字提醒，利用disabled属性，延时生效，避免点击时就出现文字提醒
const menuList = reactive([
  {
    title:'菜单一',
    code:'one',
    children:[
      {title:'子菜单一',code:'one1'},
      {title:'子菜单二',code:'one2'},
    ]
  },
  {
    title:'菜单二',
    code:'two',
   
  },
  {
    title:'菜单三',
    code:'three',
  
  },
  {
    title:'菜单四',
    code:'four',
   
  },
  {
    title:'菜单五',
    code:'five',
   
    children:[
      {title:'子菜单一',code:'five1'},
      {title:'子菜单二',code:'five2',},
    ]
  },

])

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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
