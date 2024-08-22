const three = () => import('@/views/mthree/index.vue')

export default [
    {
        path:'three',
        name:'three',
        component:three,
        meta: {
            title: '子菜单三',
        }
    }
]