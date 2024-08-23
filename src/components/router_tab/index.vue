<template>
  <div class="router-tab">
     <ul>
      <li>
        <span>首页</span>
      </li>
      <li v-for="(item ,index) in routerTabs" :key="index">
        <el-dropdown trigger="contextmenu" popper-class="eldropdown">
          <div class="tabTitle" :class="{active:index == avtiveIndex}" @contextmenu.prevent="onRightClick(item ,index)">
            <div class="title-container">{{item.title}}</div>
            <el-icon><Close /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
              <el-dropdown-item :icon="CirclePlusFilled">
                Action 2
              </el-dropdown-item>
              <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
              <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
              <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
         
           
        
         
         
      </li>
     </ul>
  </div> 
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Close,Plus,CirclePlusFilled,CirclePlus,Check,CircleCheck} from '@element-plus/icons-vue'

const avtiveIndex = ref(0)
const routerTabs = ref([
  {title:'1111',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1',path:''},
  {title:'hfkdj',path:''},
  {title:'11科技孵化1a 啊数据库到货时间',path:''},
  {title:'hfkdj',path:''},
])

const onRightClick = (a:any,b:any) => {
      console.log('2222222222222',a,b)
    
}



</script>

<style lang="less" scoped>
.router-tab{
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, .2);
    top:0;
    left:0;
    position: absolute;
    ul{
      height: 100%;
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
      li{
        flex-shrink: 0;
        height: 60%;
        border-left: 2px solid #bfbfbf;
        padding:0 6px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        
        .tabTitle{
          display: flex;
          padding:0 7px;
          transition: all .1s ease-in-out;
          align-items: center;
          .title-container{
            max-width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transform: translateX(0px);
            transition: all .1s ease-in-out;
          }
          .el-icon{
            width:0px;
            height: 14px;
            border-radius: 50%;
            transform: translateX(0px);
            transition: all .1s ease-in-out;
          }
          .el-icon:hover{
            background-color: #bfbfbf;
            border-radius: 50%;
            color: #fff;
            transition:all  .1s ease-in-out;
          
          }
        }
        .active{
          color:#0680fa;
          padding:0px;
          transition: all .1s ease-in-out;
          .title-container{
            transform: translateX(-2px);
            transition: all .1s ease-in-out;
          }
          .el-icon{
            width: 14px;
            transform: translateX(2px);
            transition: all  .1s ease-in-out;
         }
        }
       
      }
      li:last-child{
        border-right: 2px solid #bfbfbf;
      }
      li:hover{
        .tabTitle{
          color:#63b0fd;
          padding:0px;
          transition: all .1s ease-in-out;
          .title-container{
            transform: translateX(-2px);
            transition: all .1s ease-in-out;
          }
          .el-icon{
            width: 14px;
            transform: translateX(2px);
            transition: all  .1s ease-in-out;
         }
        }
      } 
    }
} 

</style>