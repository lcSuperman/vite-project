<template>
  <div id="app" v-if="isRouterAlive">
    <keep-alive>
      <router-view v-if="route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!route.meta.keepAlive" />
  </div>
 
</template>
<script setup lang="ts">
import {ref,nextTick,provide} from 'vue'
import {useTabsModal} from '@/store/index.ts'
const is_tabs_modal = useTabsModal()
import { storeToRefs } from 'pinia'
let {isShowModal} = storeToRefs(is_tabs_modal)
import { useRoute } from 'vue-router';

const route = useRoute()
console.log('33333333333',route)
const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
    isShowModal.value = false
    setTimeout( () => {
      ElMessage({
        message: '页面已刷新！',
        type: 'success',
      })
    },500)
  })
}
provide('reloadFun',reload)

</script>
<style scoped>

</style>
