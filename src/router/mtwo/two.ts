const two = () => import('@/views/mtwo/index.vue')

export default [
    {
        path:'',
        name:'two',
        component:two,
        meta: {
            title: '菜单二',
            keepAlive:false,
        }
    }
]