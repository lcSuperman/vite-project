<template>
    <ul class="header-container">
      <li class="notice">
      </li>
      <li class="individual-center">
        <el-dropdown placement="bottom-end">
                <div class="avatar">
                    <span>{{userName}}</span>
                </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <el-icon><UserFilled /></el-icon>
                        <span class="title">个人中心</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-icon><Warning /></el-icon>
                        <span class="title">关于项目</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <el-icon><ChatLineSquare /></el-icon>
                        <span class="title">Language</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-icon><Setting /></el-icon>
                        <span class="title">修改密码</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="loginout">
                        <el-icon><SwitchButton /></el-icon>
                        <span class="title">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
      </li>
    </ul>
 </template>
 
 <script  setup lang="ts">
 import {ref,onMounted} from 'vue'
 import { useRouter } from 'vue-router';
 import {SwitchButton,Setting,UserFilled,ChatLineSquare,Warning} from '@element-plus/icons-vue'
 
 
 // 获取router实例
 const router = useRouter();
 const userName = ref('')

 onMounted(() => {
    const user = JSON.parse(sessionStorage.getItem('userInfo')).userName
    userName.value = user.substring(0,2)
 })

 const loginout = () => {
    router.push({path:'/login'})
    sessionStorage.removeItem('userInfo')
 }
 </script>
 
 <style lang="less" scoped>
 .header-container{
    .notice{
        width: 60%;
    }
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .individual-center{
        .avatar{
            height: 45px;
            width: 45px;
            background-color: rgb(160, 252, 221);
            border-radius: 50%;
            display: flex;
            outline:none;
            cursor: pointer;
            justify-content: space-around;
            align-items: center;
            span{
                font-size: 20px;
            }
        }
        .avatar:hover{
            background-color: aquamarine;
            box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, .2);
        }
        .title{
            margin-left: 6px;
        }
        
    }
    
   

 }
 .router-tab{
    width: 100%;
    height: 40px;
    background-color: #e41313;
}
 /deep/.el-dropdown-menu__item--divided{
    margin: 5px 10px !important;
}




 
 </style>