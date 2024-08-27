

<template>
  <div class="logo-contaner">
    <div class="logo">
      <img src="../assets/vue.svg" alt="logo">
      <div class="container">
        <span v-if="!isCollapse" style="margin-left: 5px;">Vue3 + vite</span>
      </div>
    
    </div>
  </div>
  <div class="menu-container">
    <el-menu
      :collapse-transition="false"
      :collapse="isCollapse"
      :default-active="activePath"
      router
      :unique-opened="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="(item , index) in menuList" :key="index">
        <el-sub-menu :index="item.path"  v-if="item.children && item.children.length !== 0">
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="iconMapping[item.icon]" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="(element ,key) in item.children" :key="key">
            <el-sub-menu :index="element.path" v-if="element.children && element.children.length !== 0">
              <template #title><span>{{ element.title }}</span></template>
              <el-menu-item :index="ele.path" v-for="(ele ,i) in element.children" :key="i" @click="clickMenuItem(ele)">{{ ele.title}}</el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="element.path" v-else @click="clickMenuItem(element)">{{ element.title}}</el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item :index="item.path" v-else @click="clickMenuItem(item)">
          <el-icon v-if="item.icon">
              <component :is="iconMapping[item.icon]" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
  <div class="aside-foot" >
    <el-icon v-if="!isCollapse" size="25"  color="#000" @click="foldMenu"><Fold/></el-icon>
    <el-tooltip
        v-else
        offset="30"
        :disabled="isTooltip"
        class="box-item"
        effect="dark"
        content="展开菜单"
        placement="right"
      >
        <el-icon  size="25"  color="#000"  @click="expandMenu"><Expand /></el-icon>
  </el-tooltip>
  </div>
 
</template>

<script setup lang="ts">
import { ref ,reactive, } from 'vue'
import { useRouter } from 'vue-router';
import {Expand,Fold} from '@element-plus/icons-vue'
import iconMapping  from '@/assets/el-icon'
import {useRouteTabsStore} from '@/store/index.ts'
import { storeToRefs } from 'pinia'

// 获取router实例
const router = useRouter();
const route_teabs = useRouteTabsStore()
const props = defineProps(['changeWidth'])
const isCollapse = ref(false)
const {activePath }= storeToRefs(route_teabs)
const isTooltip = ref(true) //因为菜单折叠用了动画过度，折叠时会显示文字提醒，利用disabled属性，延时生效，避免点击时就出现文字提醒
const menuList = reactive([
  {
    title:'菜单一',
    path:'/one',
    name:'one',
    icon:'document',
    meta: {
     
    },
    children:[
      {
        title:'子菜单一',
        path:'/one/one_one', 
        name:'one_one',
        meta: {
          
        }
      },
      {
        title:'子菜单二',
        path:'/one/one_two',
        name:'one_two',
        meta: {
           
        }
      },
    ]
  },
  {
    title:'菜单二',
    path:'/two',
    name:'two',
    icon:'pieChart',
    meta: {
      
    },
  },
  {
    title:'菜单三',
    path:'/three',
    name:'three',
    icon:'coin',
    meta: {
       
    },
  },
  {
    title:'菜单四',
    path:'/four',
    name:'four',
    icon:'coin',
    meta: {
      
    },
  },
  {
    title:'菜单五',
    path:'/five',
    name:'five',
    icon:'coin',
    meta: {
       
    },
    children:[
      {
        title:'子菜单三',
        path:'/five/five_one', 
        name:'five_one',
        meta: {
          
        }
      },
      {
        title:'子菜单四',
        path:'/five/five_two',
        name:'five_two',
        meta: {
           
        }
      },
      {
        title:'子菜单五',
        path:'/five/five_three',
        name:'five_three',
        meta: {
           
        }
      },
      {
        title:'子菜单六',
        path:'/five/five_four',
        name:'five_four',
        meta: {
           
        }
      },
      {
        title:'子菜单七',
        path:'/five/five_five',
        name:'five_five',
        meta: {
          
        }
      },
      {
        title:'子菜单八',
        path:'/five/five_six',
        name:'five_six',
        meta: {
           
        }
      },
    ]
  },
  {
    title:'菜单六',
    path:'/six',
    name:'six',
    icon:'coin',
    meta: {
       
    },
  },
  {
    title:'菜单七',
    path:'/seven',
    name:'seven',
    icon:'coin',
    meta: {
       
    },
  },
  {
    title:'菜单八',
    path:'/night',
    name:'night',
    icon:'coin',
    meta: {
       
    },
  },

])

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath)
}

const clickMenuItem = (item:any) => {
  route_teabs.addTabs(item)
}

const foldMenu = () => {
  isCollapse.value = true
  setTimeout(() => {
    isTooltip.value = false
  })
  props.changeWidth(65)
}
const expandMenu = () => {
  isCollapse.value = false
  isTooltip.value = true
  props.changeWidth(160)
}


</script>

<style lang="less" scoped>
.logo-contaner{
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo{
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
      height: 30px;
    }
    .container span {
      white-space: nowrap; /* 防止文本换行 */
    }
  }
}
.menu-container{
  overflow: auto;
  height:calc(100% - 100px);
  overflow-x: hidden; /*菜单展开时会闪一下滚动条， 隐藏横向滚动条 */
  /deep/.el-menu{
    background-color:rgba(0, 0, 0, 0);
    width:100%;
    border-right:none;
  //  .el-menu-item.is-active{ //修改菜单点击后激活的背景色
  //     background-color: #f1f1f1;
  //   }
  //   .el-sub-menu__title:hover{//修改菜单文字的title的hoiver的背景色
  //     background-color: #bd1a1a;
  //   }  
  //   .el-menu-item:hover{//修改菜单文字的hoiver的背景色
  //     background-color: #bd1a1a;
  //   }
    .el-menu-item-group__title{
      padding:0px;
    }
  }
}

.aside-foot{
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .el-icon{
     cursor: pointer;
  }
}

</style>
