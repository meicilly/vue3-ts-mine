//service统一的出口
import HYRequest from "./request/request";
import {BASE_URL,TIME_OUT} from "./request/config"
import  loaclCache from "@/utils/cache"
const hyRequest = new HYRequest({
    timeout:TIME_OUT,
    baseURL: BASE_URL,
    interceptors:{
        requestInterceptor:(config) => {
            //console.log(config)
            let token = loaclCache.getCache("token")
            //console.log(token)
            if(token){
                config.headers.Authorization = `Bearer ${token}`
                //console.log(config.headers.Authorization)
            }
            console.log("请求成功的拦截")
            return config
        },
        requestInterceptorCatch: (err) => {
            console.log("请求失败的拦截")
            return err
        },
        responseInterceptor:(res) => {
            console.log("响应成功的拦截")
            //console.log(res)
            return res
        },
        responseInterceptorCatch : (err) => {
            console.log("响应失败的拦截")
            return err
        }
    }
})
export default hyRequest