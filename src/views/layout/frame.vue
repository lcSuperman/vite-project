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
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { ref} from 'vue'
import AsideMenueVue from "@/components/asideMenu.vue";
import Header from '@/components/header.vue';
import Router_tab from '@/components/router_tab/index.vue';

//左菜单逻辑
const asideWidth = ref(160)
const changeAsideWidth = (width:number) => {
  asideWidth.value = width
}

  
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
            --el-main-padding:10px;
            position: relative;
         }
      }
    }
  
        
}
 
</style>
