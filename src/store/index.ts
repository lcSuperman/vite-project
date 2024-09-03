import { defineStore } from 'pinia'


// tab标签的展示，激活状态
export const useRouteTabsStore = defineStore('route_teabs', {
    // 其他配置...
    state:() => {
        return {
            routeTabs:[],
            pathArr:[],
            activePath:'/home',
            activeIndex:'-1',
        }

    },
    getters:{},
    actions:{
        addTabs(obj){
           this.activePath = obj.path
           if(this.pathArr.indexOf(obj.path) == -1){
                this.routeTabs.push(obj)
                this.pathArr.push(obj.path)
                this.activeIndex = this.pathArr.length -1
           }else{
            this.routeTabs.forEach((item,index)=> {
                if(obj.path == item.path){
                    this.activeIndex = index
                }
            })
           }
        },
        changeActiveIndex(index){
          this.activeIndex = index
          if(index !== -1){
            this.activePath =  this.routeTabs[this.activeIndex].path
          }else{
             this.activePath = '/home'
          }
        },
        removeTabs(index){
            this.routeTabs.splice(index,1)
            this.pathArr = []
            this.routeTabs.forEach( item => {
                this.pathArr.push(item.path)
            })
            let goIndex = index - 1
            if(index == this.activeIndex){
                this.changeActiveIndex(goIndex)
            } else{
                if(index < this.activeIndex){
                    this.activeIndex = this.activeIndex - 1
                }
            }
        },
    },
    // 开启数据缓存
    persist: {
        enabled: true,
        // strategies: [
        //     {
        //         key: 'abc',//设置存储的key
        //         storage: localStorage,//表示存储在localStorage
        //     }
        // ]
        
    }
 })

 //tab标签右键菜单定位展示
export const useTabsModal = defineStore('is_tabs_modal',{
    state:()=>{
        return {
            isShowModal:false,
            leftWidth:0,
            topWidth:0,
            clickIndexL:0,
        }
    },
    persist: {
        enabled: true,
    }
})

//登录用户的信息
export const  useUserInfo = defineStore('user_info',{
    state:() => {
        return {
           loginInfo:{}
        }
    },
    persist: {
        enabled: true,
    }
})


