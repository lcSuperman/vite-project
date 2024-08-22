
const one_one = () => import('@/views/mone/one1/index.vue')
const one_two = () => import('@/views/mone/one2/index.vue')

export default [
    {
        path:'one_one',
        name:'one_one',
        component:one_one,
        meta: {
            title: '子菜单一', // 页签标题
        }
    },
    {
        path:'one_two',
        name:'one_two',
        component:one_two,
        meta: {
            title: '子菜单二',
        }
    }
]