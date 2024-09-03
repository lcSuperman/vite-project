import Mock from 'mockjs'

const menus = Mock.mock([
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
        icon:'tickets',
        meta: {
           
        },
      },
      {
        title:'菜单四',
        path:'/four',
        name:'four',
        icon:'dataLine',
        meta: {
          
        },
      },
      {
        title:'菜单五',
        path:'/five',
        name:'five',
        icon:'odometer',
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
        icon:'mapLocation',
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

export default menus