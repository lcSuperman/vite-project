<template>
   <ul class="error">
    <li >
        <img src="../../assets/404.png" alt="">
        <div class="title">
            <h2>抱歉，您访问的页面出错了</h2>  
            <p>网页可能已被删除或者不存在</p>
            <el-button type="primary" @click="goHome">返回首页</el-button>
        </div>
    </li>
</ul>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push({name:'home'})
}


</script>

<style lang="less" scoped>
@import "@/assets/less/index.less" ;

.error{
 height: 100%;
 width: 100%;
 background-color: @main_content_color;
 display: flex;
 justify-content: space-around;
 flex-direction: column;
 align-items: center;
 li:first-child{
    width: 60%;
    height: 70%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2%;
    img{
        height:350px;
        width:700px;
    }
    .title{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            margin: 10px 0;
        }
    }
 }
}

</style>