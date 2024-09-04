<template>
  <div class="router-tab">
    <div class="home" :class="{activeLi:activePath == '/home',onlyHome:routeTabs.length == 0}"  @click="clikHome"><el-icon><HomeFilled /></el-icon>首页</div>
     <div class="tabs" ref="outdivRef">
        <ul ref="el">
          <li  v-for="(item ,index) in routeTabs" :key="item.path"  :class="{activeLi:item.path == activePath}" :id="item.name" @contextmenu.prevent="onRightClick">
            <div class="tabTitle" :class="{active:item.path == activePath}" @click="clikRouterRab(item ,index)">
              <div class="title-container">{{item.title}}</div>
              <el-icon  @click.stop="clickRemoveTab(index)"><Close /></el-icon>
            </div>
          </li>
        </ul>
     </div>
    <div class="lricons" >
      <el-icon v-if="isShowBtns" :size="25" color="#73767a" @click="clickScroll(-200)"><CaretLeft /></el-icon>
      <el-icon v-if="isShowBtns" style="margin-left: -10px;" :size="25" color="#73767a"  @click="clickScroll(200)"><CaretRight /></el-icon>
    </div>
    
  </div>
  <Transition name="slide-down">
    <div v-clickOutside="clicktabModal" class="tabsModal" ref="modalRef" v-show="isShowModal" :style="{top:topWidth+'px',left:leftWidth +'px'}">
      <ul>
        <li class="refresh" @click="refresh" v-if="activeIndex == clickIndexL">
          <el-icon><Refresh /></el-icon>
          <span>刷新</span>
          </li>
        <li class="singleclose" @click="closeTab">
          <el-icon><Close /></el-icon>
          <span>关闭标签</span>
          </li>
        <li  @click="closeOtherTabs">
          <el-icon><FolderDelete /></el-icon>
          <span>关闭其他标签</span>
          </li>
        <li @click="closeAllTabs">
          <el-icon><FolderDelete /></el-icon>
          <span>关闭所有标签</span>
          </li>
      </ul>
    </div>
 </Transition>
</template>

<script lang="ts" setup>
import {ref,reactive,watch,nextTick,onMounted,inject} from 'vue'
import {Close,CaretLeft,CaretRight,HomeFilled,Refresh,FolderDelete} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import {useRouteTabsStore,useTabsModal} from '@/store/index.ts'
import { storeToRefs } from 'pinia'
import { useDraggable } from 'vue-draggable-plus'

// 获取router实例
const router = useRouter();
const route_teabs = useRouteTabsStore()
const is_tabs_modal = useTabsModal()
let {routeTabs,activePath,activeIndex} = storeToRefs(route_teabs)
const {removeTabs,removeAllTabs} = route_teabs
let {isShowModal,leftWidth,topWidth,clickIndexL} = storeToRefs(is_tabs_modal)

onMounted(() => {
  isShowModal.value = false
})



const modalRef = ref(null)

const onRightClick =(e:any) => {
  isShowModal.value = false
  // 获取浏览器窗口的可视区域宽度（包括滚动条等）
  var clientWidth = document.documentElement.clientWidth;
  if(e.target.textContent !== '首页'){
    routeTabs.value.forEach( (item:object ,index:number) => {
          if(e.target.textContent == item.title){
            clickIndexL.value = index
          }
    })
  }
  nextTick(() => {
    isShowModal.value = true
    const modalWidth = modalRef.value.offsetWidth !== 0 ? modalRef.value.offsetWidth : '90'
    if(clientWidth - e.clientX < modalWidth){
      leftWidth.value = e.clientX - modalWidth
    }else{
      leftWidth.value = e.clientX + 2
    }
    topWidth.value = e.clientY + 2
  });

}

////点击页签改变触发样式的逻辑
const clikRouterRab = async (item:object,index:number) =>{
   await route_teabs.changeActiveIndex(index)
   await router.push({path:activePath.value})
} 
const clikHome = (title:string) => {
   route_teabs.changeActiveIndex(-1)
   router.push({name:'home'})
}



////页签较长，会显示按钮和点击按钮滑动页签的逻辑
const  outdivRef = ref()
const el = ref()
const ulWidth = ref(0)
const isShowBtns = ref(null)

const  getShowOrHide = () => {
  ulWidth.value = 0
  const arr = [...el.value.children]
  arr.forEach((item:any) => {
    ulWidth.value += item.offsetWidth
  })
  if(outdivRef.value.offsetWidth - ulWidth.value > 0){
    isShowBtns.value = false
  }else{
    isShowBtns.value = true
    if(activeIndex.value == routeTabs.value.length - 1){
      //滚动页签，让点击页签可以看到
      clickScroll(200)
    }
  }
}
watch(routeTabs, (newValue, oldValue) => {
  nextTick( () => {
    getShowOrHide() //如果要在watch中调用事件方法，要把watch写在方法之后因为const和let定义的书型盒方法不能提升
  })
},
{deep: true,immediate: true},
)
const scrollToTab = (tabId:string) => {
  const element = document.getElementById(tabId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

watch(activeIndex,(newVal)=>{
  if(newVal !== -1 && isShowBtns.value){
    const activeId = routeTabs.value[newVal].name
    scrollToTab(activeId)
  }
  
},{immediate: true})

const clickScroll = (swidth:number) => {
  try{
    if (outdivRef.value) { 
      // 滚动固定宽度的像素值，例如100px
      const scrollWidth = swidth;
      // 获取当前滚动位置
      let scrollLeft = outdivRef.value.scrollLeft;
      //滚动到设置的滚动位置
      outdivRef.value.scrollTo({
        left: (scrollLeft + scrollWidth) % outdivRef.value.scrollWidth,
        behavior: 'smooth'
      });
    }
  }catch{}
}
const clickRemoveTab = async (index:number) =>{
  await removeTabs(index)
  await router.push({path:activePath.value})
}


////页签右键菜单事件
const reloadFun = inject('reloadFun')
const closeTab = async() => {
  await removeTabs(clickIndexL.value);
  router.push({path:activePath.value})
  isShowModal.value = false
}
const closeAllTabs = async() => {
  route_teabs.$reset()
  isShowBtns.value = false
  await router.push({path:activePath.value})
  isShowModal.value = false
}
const closeOtherTabs = () => {
  const lastPth =   routeTabs.value[clickIndexL.value]
  route_teabs.$patch({
    routeTabs:[{...lastPth}],
    pathArr:[lastPth.path],
    activePath:lastPth.path,
    activeIndex:0,
  })
  router.push({path:activePath.value})
  isShowModal.value = false
}

const refresh = () => {
  return reloadFun()
}


useDraggable(el, routeTabs, {
  animation: 150,
  ghostClass: 'ghost',
  onStart() {
    // console.log('start')
  },
  onUpdate() {
    let index = routeTabs.value.findIndex((item:any) => item.path === activePath.value);
    activeIndex.value = index

  }
})


const clicktabModal = () => {
  isShowModal.value = false
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
    display: flex;
    align-items: center;
    .home{
        height: 35px;
        width: 60px;
        box-sizing: border-box;
        border:1px solid #bfbfbf;
        padding:0 8px;
        display: flex;
        cursor: pointer;
        align-items: center;
        font-size: 14px;
        border-radius:4px 0 0 0 ;
    }
    .home:hover{
      color:@router_tab_hover_color;
    }
    .activeLi{
      color:@router_tab_active_color;
    }
    .onlyHome{
      border-radius:4px 4px 0 0 !important;
    }
    .tabs{
      height: 100%;
      width:calc(100% - 105px) ;
      overflow-x: auto;
      overflow-y: hidden;
      ul{
        height: 100%;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        transition: all 0.2s ease;
        li{
          flex-shrink: 0;
          height: 35px;
          box-sizing: border-box;
          border:1px solid #bfbfbf;
          padding:0 6px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
          user-select: none; /* 禁止文本选择 */
          margin-left:2px ;
          .tabTitle{
            display: flex;
            padding:0 6px;
            transition: all .1s ease-in-out;
            align-items: center;
            .title-container{
              max-width: 100px;
              white-space: nowrap;
              overflow: hidden;
              font-size: 14px;
              text-overflow: ellipsis;
              transform: translateX(0px);
              transition: all 0.1s ease-in-out;
            }
            .el-icon{
              width:0px;
              height: 13px;
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
          .modal{
            position: absolute;
            bottom: 0;
            height: 200px;
            width: 100px;
            background-color:pink;
          }
        
        }
        li:last-child{
          border-radius:0 4px 0 0 ;
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
    .lricons{
      width: 45px;
      height: 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .el-icon{
        cursor: pointer;
      }
    }
   
    ::-webkit-scrollbar {
      height: 0px;
      width: 0px;
      overflow-y: hidden;
    }   
}
.tabsModal{
  position: fixed;
  border-radius: 5px;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, .1);
  padding:5px;
  ul{
    li{
      padding: 5px 20px 5px 12px;
      font-size: 14px;
      color: #73767a;
      cursor: pointer;
      .el-icon{
        padding-right:10px;
      }
    }
    .refresh{
      padding-bottom: 10px;
      border-bottom: 1px solid #dcdcdc;
    }
    .singleclose{
      padding-top: 10px;
    }
    li:hover{
      background-color:#eaeaea ;
      border-radius:4px ;
    }
  }
}
.ghost{
  background-color: #79bbff;
  cursor: move;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: transform 0.2s, opacity 0.2s,height 0.2s;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-5px);
  opacity: 0;
  height: 0;

}

</style>