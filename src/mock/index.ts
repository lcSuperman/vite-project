import Mock from 'mockjs'
import menus from './data/memus'

Mock.mock('/api/menus','get',menus)