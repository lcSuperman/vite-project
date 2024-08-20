

<template>
  <div class="logo-contaner">
    <div class="logo">
      <img src="../assets/vue.svg" alt="logo">
      <div class="container">
        <span v-if="!isCollapse" style="margin-left: 5px;">Vue3 + vite</span>
      </div>
    
    </div>
  </div>
  <el-menu
    default-active="2"
    :collapse-transition="false"
    :collapse="isCollapse"
    :popper-class="'custom-menu-popper'"
    @open="handleOpen"
    @close="handleClose"
  >
  <el-sub-menu index="1">
      <template #title>
        <el-icon><Coin /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><Coin /></el-icon>
      <template #title>11111</template>
    </el-menu-item>
    <el-menu-item index="3">
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
    </el-menu-item>
  
  </el-menu>
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
import { ref } from 'vue'
import { Fold,Expand,Coin} from '@element-plus/icons-vue';  

const props = defineProps(['changeWidth'])
const isCollapse = ref(false)
const isTooltip = ref(true) //因为菜单折叠用了动画过度，折叠时会显示文字提醒，利用disabled属性，延时生效，避免点击时就出现文字提醒

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
  props.changeWidth(180)
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
.el-menu{
  height:calc(100% - 110px);
  width:100%;
  background-color: rgb(181, 252, 228);
}

.aside-foot{
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .el-icon{
     cursor: pointer;
  }
}

</style>
