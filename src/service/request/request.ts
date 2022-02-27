import axios from "axios"
import type {AxiosInstance,AxiosRequestConfig} from "axios"
import {HYRequestConfig,HYRequestInterceptors} from "./types"

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true
class HYRequest{
    instance:AxiosInstance
    interceptors?:HYRequestInterceptors
    showLoading:boolean
    loading?: ILoadingInstance
    constructor(config:HYRequestConfig){
        this.instance = axios.create(config)
        this.showLoading = config.showLoading ?? DEAFULT_LOADING
        this.interceptors = config.interceptors
        //从config中取出的拦截器是对应的实例拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )
        //添加所有实例都有的拦截器
        this.instance.interceptors.request.use((config) => {
            // console.log(config)
            // console.log("所有的实例都有的拦截器 请求拦截")
            if (this.showLoading) {
              this.loading = ElLoading.service({
                lock: true,
                text: '正在请求数据。。。',
                background: 'rgba(0,0,0,0.5)'
              })
            }
            return config
        },err => {
            console.log("请求拦截失败")
            return err
        })
        this.instance.interceptors.response.use((res) => {
          this.loading?.close()
          //return res
         // const data = res.data
            //console.log(res)
            console.log("所有的实例都的拦截器 响应成功")
            return res
        },err => {
            this.loading?.close()
            if (err.response.status === 404) {
                console.log('404的错误~')
              }
            console.log("响应拦截失败")
            return err
        })
    }
    request<T>(config: HYRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
          // 1.单个请求对请求config的处理
          if (config.interceptors?.requestInterceptor) {
            config = config.interceptors.requestInterceptor(config)
          }
    
          // 2.判断是否需要显示loading
          if (config.showLoading === false) {
            this.showLoading = config.showLoading
          }
    
          this.instance
            .request<any, T>(config)
            .then((res) => {
              // 1.单个请求对数据的处理
              if (config.interceptors?.responseInterceptor) {
                res = config.interceptors.responseInterceptor(res)
              }
              // 2.将showLoading设置true, 这样不会影响下一个请求
              this.showLoading = DEAFULT_LOADING
              //console.log(res)
              // 3.将结果resolve返回出去
              resolve(res)
            })
            .catch((err) => {
              // 将showLoading设置true, 这样不会影响下一个请求
              this.showLoading = DEAFULT_LOADING
              reject(err)
              return err
            })
        })
      }
    get<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
      }
    
      post<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
      }
    
      delete<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
      }
    
      patch<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
      }
}
export default HYRequest