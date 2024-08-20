<template>
    <div class="common-layout">
        <el-container>
          <el-aside :style="{width:asideWidth+'px'}">
            <AsideMenueVue :changeWidth="changeAsideWidth" />
          </el-aside>
          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
          </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { ref} from 'vue'
import AsideMenueVue from "@/components/asideMenu.vue"

const asideWidth = ref(180)

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
        transition: width 0.1s;
        background-color: rgb(181, 252, 228);
        overflow-x: hidden; /*菜单展开时会闪一下滚动条， 隐藏横向滚动条 */
      }
      .el-container{
        //  .el-header{
        //     background-color: aquamarine;
        //  }
         .el-main{
            background-color: rgb(231, 231, 231);
         }
      }
    }
        
}
 
</style>
