<template>
    <div class="common-layout">
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
          </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">

  
</script>



<style lang="less" scoped>
.common-layout{
    width: 100%;
    height: 100%;
    .el-container{
      height: 100%;
      width: 100%;
      .el-aside{
        background-color: aqua;
      }
      .el-container{
         .el-header{
            background-color: aquamarine;
         }
         .el-main{
            background-color: rgb(231, 231, 231);
         }
      }
    }
        
}
 
</style>
