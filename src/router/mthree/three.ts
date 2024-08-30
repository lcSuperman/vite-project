const three = () => import('@/views/mthree/index.vue')

export default [
    {
        path:'',
        name:'three',
        component:three,
        meta: {
            title: '菜单三',
            keepAlive:false,
        }
    }
]