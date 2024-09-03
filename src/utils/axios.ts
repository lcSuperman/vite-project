import axios,{ AxiosRequestConfig, AxiosResponse } from 'axios'
import {useUserInfo } from '@/store/index.ts'


const user_info = useUserInfo()
const loginInfo = user_info.loginInfo
const DEFAULT_BASE_URL = ''; // 默认基础URL
//1. 创建新的axios实例
const service  = axios.create({
    baseURL: DEFAULT_BASE_URL,
    timeout: 1000,
    headers:{
      'Content-Type': 'application/json' 
    }
})

// 2.请求拦截器
service.interceptors.request.use(  (config:AxiosRequestConfig) => {
    config.data = JSON.stringify(config.data);
    let token = sessionStorage.getItem('token');
    if(loginInfo.token){
       config.headers.token= loginInfo.token; //如果要求携带在请求头中
     }
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 3.响应拦截器
axios.interceptors.response.use( (response:AxiosResponse) => {
    // 对响应数据做点什么
    return response;
  }, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//4.导入
export default service

