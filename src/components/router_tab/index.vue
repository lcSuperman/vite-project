<template>
  <div class="router-tab">
     <ul>
      <li>
        <span>首页</span>
      </li>
      <li v-for="(item ,index) in routerTabs" :key="index">
        <span>{{item.title}}</span>
        <el-icon><Close /></el-icon>
      </li>
      <li>
        <span>风格和符合规范</span>
        <el-icon><Close /></el-icon>
      </li>
     </ul>
  </div> 
</template>

<script lang="ts" setup>
import {Close} from '@element-plus/icons-vue'
import {ref} from 'vue'

const routerTabs = ref([
  {title:'1111',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
])

</script>

<style lang="less" scoped>
.router-tab{
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, .2);
    position: absolute;
    top:0;
    left:0;
    ul{
      height: 100%;
      display: flex;
      align-items: center;
      overflow: hidden;
      li{
        flex-shrink: 0;
        border-left: 2px solid #bfbfbf;
        padding:0 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        span{
          margin-right: 5px;
        }
        .el-icon{
           width: 0px;
           transition: width .2s ease-in-out;
        }
        
      }
      li:last-child{
        border-right: 2px solid #bfbfbf;
      }
      li:hover{
        color:#409EFF;
        .el-icon{
          width: 20px;
          transition: width .2s ease-in-out;
      }

      } 
    }
}


</style>