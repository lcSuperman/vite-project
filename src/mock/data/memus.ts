import Mock from 'mockjs'

const menus = Mock.mock([
    {
        path:'/one',
        name:'one',
        icon:'document',
        meta: {
          title:'菜单一',
        },
        children:[
          {
            path:'/one/one_one', 
            name:'one_one',
            meta: {
              title:'子菜单一',
            }
          },
          {
            path:'/one/one_two',
            name:'one_two',
            meta: {
              title:'子菜单二',
            }
          },
        ]
      },
      {
        path:'/two',
        name:'two',
        icon:'pieChart',
        meta: {
          title:'菜单二',
        },
      },
      {
        path:'/three',
        name:'three',
        icon:'tickets',
        meta: {
          title:'菜单三', 
        },
      },
      {
        path:'/four',
        name:'four',
        icon:'dataLine',
        meta: {
          title:'菜单四',
        },
      },
     
])

export default menus