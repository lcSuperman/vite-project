<template>
    <el-watermark  style="height:100%"  :font="font" :content="['首页', 'Element Plus']">
        <div class="aa">
        </div>
    </el-watermark>
 </template>
 
 <script  setup lang="ts">
 import { reactive } from 'vue'
 const font = reactive({
   color: 'rgba(0, 0, 0, .15)',
 })
 
 </script>
 
 <style lang="less" scoped>
 @import "@/assets/less/index.less" ;
 .aa{
    height: 100%;
    width: 100%;

 }

 </style>