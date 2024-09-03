import axios from './axios.ts'

export default (method,url,params) => {
    let config ={
        method,
        url,
    }
    if(params) config.params = params
    return axios(config)
};
  


     