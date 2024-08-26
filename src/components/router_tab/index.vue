<template>
  <div class="router-tab">
    
      <el-icon v-if="isShowBtns" :size="25" color="#73767a" @click="clickScroll(-200)"><CaretLeft /></el-icon>
      <!-- <el-icon :size="25" @click="clickScroll(200)"><CaretRight /></el-icon> -->
     
     <div class="tabs" ref="outdivRef">
        <ul ref="indivRef">
          <li  :class="{activeLi:activeIndex == '-1',onlyHome:routeTabs.length == 0}"  @click="clikHome"><el-icon><HomeFilled /></el-icon>首页</li>
          <li v-for="(item ,index) in routeTabs" :key="index"  :class="{activeLi:index == activeIndex}">
            <div class="tabTitle" :class="{active:index == activeIndex}" @click="clikRouterRab(item ,index)">
              <div class="title-container">{{item.title}}</div>
              <el-icon  @click.stop="removeTab(index)"><Close /></el-icon>
            </div>
          </li>
        </ul>
     </div>
       <!-- <el-icon :size="25" @click="clickScroll(-200)"><CaretLeft /></el-icon> -->
      <el-icon v-if="isShowBtns" :size="25" color="#73767a"  @click="clickScroll(200)"><CaretRight /></el-icon>
  </div> 
</template>

<script lang="ts" setup>
import {ref,reactive,watch,nextTick,onMounted} from 'vue'
import {Close,CaretLeft,CaretRight,HomeFilled,ArrowDownBold} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import {useRouteTabsStore} from '@/store/index.ts'
import { storeToRefs } from 'pinia'

// 获取router实例
const router = useRouter();
const route_teabs = useRouteTabsStore()
let {routeTabs,activePath,activeIndex} = storeToRefs(route_teabs)


//点击页签改变触发样式的逻辑
const clikRouterRab = async (item:object,index:number) =>{
   await route_teabs.changeActiveIndex(index)
   await router.push({path:activePath.value})
} 
const clikHome = (title:string) => {
   route_teabs.changeActiveIndex(-1)
   router.push({name:'home'})
}



//页签较长，会显示按钮和点击按钮滑动页签的逻辑
const  outdivRef = ref()
const indivRef = ref()
const ulWidth = ref(0)
const isShowBtns = ref(false)

const  getShowOrHide = () => {
  ulWidth.value = 0
  console.log('3---------------',indivRef.value.children)
  const arr = [...indivRef.value.children]

  arr.forEach((item:any) => {
    ulWidth.value += item.offsetWidth
  })
  console.log('3333333333',outdivRef.value.offsetWidth,ulWidth.value)
  if(outdivRef.value.offsetWidth - ulWidth.value > 0){
    isShowBtns.value = false
  }else{
    isShowBtns.value = true
  }
}
watch(routeTabs, async (newValue, oldValue) => {
  await nextTick()
  await getShowOrHide() //如果要在watch中调用事件方法，要把watch写在方法之后因为const和let定义的书型盒方法不能提升
},
{ deep: true},
)
const clickScroll = (swidth:number) => {
  try{
    if (outdivRef.value) { 
      // 滚动固定宽度的像素值，例如100px
      const scrollWidth = swidth;
      // 获取当前滚动位置
      let scrollLeft = outdivRef.value.scrollLeft;
      outdivRef.value.scrollTo({
        left: (scrollLeft + scrollWidth) % outdivRef.value.scrollWidth,
        behavior: 'smooth'
      });
    }

  }catch{}

}

const removeTab = async (index:number) =>{
  await route_teabs.removeTabs(index)
  await router.push({path:activePath.value})
}

</script>

<style lang="less" scoped>
 @import "@/assets/less/index.less" ;
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
    display: flex;
    align-items: center;
    .tabs{
      height: 100%;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      ul{
        height: 100%;
        display: flex;
        align-items: center;
        transition: all 0.2s ease;
        li{
          flex-shrink: 0;
          height: 35px;
          border-top: 1px solid #bfbfbf;
          border-left: 1px solid #bfbfbf;
          border-bottom: 1px solid #bfbfbf;
          padding:0 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
          .tabTitle{
            display: flex;
            padding:0 6px;
            transition: all .1s ease-in-out;
            align-items: center;
            .title-container{
              max-width: 100px;
              white-space: nowrap;
              overflow: hidden;
              font-size: 15px;
              text-overflow: ellipsis;
              transform: translateX(0px);
              transition: all 0.1s ease-in-out;
            }
            .el-icon{
              width:0px;
              height: 12px;
              border-radius: 50%;
              transform: translateX(0px);
              transition: all 0.1s ease-in-out;
            }
            .el-icon:hover{
              background-color: #bfbfbf;
              border-radius: 50%;
              color: #fff;
              transition:all 0.1s ease-in-out;
            
            }
          }
          .active{
            color:@router_tab_active_color;
            padding:0px;
            transition: all .01s ease-in-out;
            .title-container{
              transform: translateX(-2px);
              transition: all .01s ease-in-out;
            }
            .el-icon{
              width: 12px;
              transform: translateX(2px);
              transition: all  .01s ease-in-out;
          }
          }
        
        }
        li:first-child{
          font-size: 14px;
          border-radius:4px 0 0 0 ;
        }
        li:last-child{
          border-right: 1px solid #bfbfbf;
          border-radius:0 4px 0 0 ;
          margin-right: 10px;
        }
        .onlyHome{
          border-radius:4px 4px 0 0 !important;
        }
        li:hover{
          color:@router_tab_hover_color;
          .tabTitle{
            color:@router_tab_hover_color;
            padding:0px;
            transition: all .1s ease-in-out;
            .title-container{
              transform: translateX(-2px);
              transition: all .1s ease-in-out;
            }
            .el-icon{
              width: 12px;
              transform: translateX(2px);
              transition: all  .1s ease-in-out;
          }
          }
        } 
        .activeLi{
          color:@router_tab_active_color;
        }
    
      
      }
    }
    .el-icon{
      cursor: pointer;
    }
    ::-webkit-scrollbar {
      height: 0px;
      width: 0px;
      overflow-y: hidden;
    }   
}

</style>