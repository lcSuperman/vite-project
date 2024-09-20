<template>
    <div class="common-layout">
        <el-container >
          <el-aside :style="{width:asideWidth+'px'}">
            <AsideMenueVue :changeWidth="changeAsideWidth" />
          </el-aside>
          <el-container>
            <el-header>
              <Header></Header>
            </el-header>
            <el-main>
              <Router_tab></Router_tab>
              <div class="main_container">
                  <div class="content">
                    <el-watermark  style="height:100%"  :font="font" :content="content">
                       <router-view></router-view>
                    </el-watermark>
                  </div>
                </div>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { ref,reactive,onMounted} from 'vue'
import AsideMenueVue from "@/components/asideMenu.vue";
import Header from '@/components/header.vue';
import Router_tab from '@/components/router_tab/index.vue';
import {useUserInfo} from '@/store/index.ts'

//左菜单逻辑
const asideWidth = ref(160)
const changeAsideWidth = (width:number) => {
  asideWidth.value = width
}

//水印
const user_info = useUserInfo()
const content= ref([])
const font = reactive({
   color: 'rgba(0, 0, 0, .15)',
 })

onMounted(() => {
  const str = user_info.loginInfo.userName
  content.value.push(str)
})

  
</script>

<style lang="less" scoped>
.common-layout{
    width: 100%;
    height: 100%;
    .el-container{
      height: 100%;
      width: 100%;
      .el-aside{
        background: linear-gradient(180deg, rgb(150, 253, 219), rgb(65, 199, 252));
        transition: width 0.1s;
        overflow-x: hidden; /*菜单展开时会闪一下滚动条， 隐藏横向滚动条 */
      }
      .el-container{
         .el-header{
           background: linear-gradient(90deg, rgb(150, 253, 219) 0%, rgb(74, 201, 252) 50%,rgb(188, 108, 253) 100%);
         }
         .el-main{
            background-color: rgb(233, 233, 233);
            --el-main-padding:0px;
            position: relative;
         }
      }
    }
  
        
}
 
</style>
