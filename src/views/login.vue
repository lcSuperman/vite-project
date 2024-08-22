<template>
    <div class="login-container">
        <div class="beijing"></div>
        <div class="content">
            <img src="../assets/vue.svg" alt="">
            <el-form
            ref="ruleFormRef"
            style="width:65%;"
            :model="loginForm"
            :rules="rules"
            label-width="0"
            class="demo-ruleForm"
            >
            <el-form-item  prop="userName">
               <el-input  v-model="loginForm.userName"  clearable  placeholder="用户名" />
            </el-form-item>
            <el-form-item  prop="passWord">
               <el-input type="password" show-password  v-model="loginForm.passWord"  placeholder="密 码" />
            </el-form-item>
            <el-form-item>
                <div style="width:100%;display: flex; justify-content: space-between;">
                    <el-button style="padding: 0 45px;">注 册</el-button>
                    <el-button v-if="!loginLoading" style="padding: 0 45px;" type="primary" @click="loginHome">登 录</el-button>
                    <el-button v-else type="primary" style="padding: 0 30px;" :loading="loginLoading">登录中</el-button>
                </div>
            </el-form-item>
            </el-form>
           
        </div>
    </div>
</template>
<script setup lang="ts">

import {reactive,ref} from 'vue'
import { useRouter } from 'vue-router';

// 获取router实例
const router = useRouter();
//定义的名字要和模版中ref的名称一致
const ruleFormRef = ref()

const validateName = (rule:any,value:any,callback:any) => {
    if(value==''){
        callback(new Error('用户名不能为空'))
    }else{
        // var pattern = /^[a-zA-Z0-9_-]{6,16}$/;
        // if(pattern.test(value)){
        //     callback()
        // }else{
        //     callback(new Error('至少6-16位字符，可包含字母，数字，下划线，减号'))
        // }
        if(value == 'lulingfeng'){
            callback()
        }else{
            callback(new Error('用户名不正确'))
        }
    }
}
const validatePass = (rule:any,value:any,callback:any) => {
    if(value == ''){
        callback(new Error('密码不能为空'))
    }else{
        // var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
        // if(pattern.test(value)){
        //     callback()
        // }else{
        //     callback(new Error('至少8-16个字符，包含至少1个大写字母，1个小写字母和1个数字'))
        // }
        if(value == 'QAZwsx123'){
            callback()
        }else{
            callback(new Error('密码不正确'))
        }
    }

}

const rules = reactive({
    userName:[{validator:validateName,trigger:'blur'}],
    passWord:[{validator:validatePass,trigger:'blur'}],
})
const loginForm = reactive({
    userName:'',
    passWord:''
})
const loginLoading = ref(false)


//登录事件
const loginHome = () =>{
    ruleFormRef.value.validate((valid:any) => {
        if(valid){
            loginLoading.value = true
            setTimeout(() => {
                router.push({path:'/home'})
                loginLoading.value = false
                sessionStorage.setItem('userInfo',JSON.stringify(loginForm))
            },1000)
        }
    })
}
  
</script>


<style scoped lang="less">
 .login-container{
    position: relative;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .beijing{  
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top:0px;
        background: url('../assets/beijing.png');
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-filter: blur(6px);
        -moz-filter: blur(6px);
        -o-filter: blur(6px);
        -ms-filter: blur(6px);
        filter: blur(6px);
    }
    .content{
        width: 35%;
	    height: 55%;
        z-index: 5;
        background-color:rgba(255,255,255,0.4);
        border-radius: 10px;
        box-shadow: 0px 0px 10px 6px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 2% 0;
        img{
            width: 80px;
        }
    }
  }


</style>
