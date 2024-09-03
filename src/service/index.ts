import axios from '@/utils/http.ts'

//获取左侧菜单的接口
export const getmenus = (params) => axios('get','/api/menus',params);