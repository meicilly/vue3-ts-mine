import { Module } from "vuex";

import {
    accountLoginRequest,
    requestUserMenusByRoleId
  } from '@/service/login/login'
import {ILoginState} from "./types"
import {IRootState} from "../types"
import { IAccount } from '@/service/login/types'
import LocalCache from "@/utils/cache"
import router from "@/router"
import {mapMenusToRoutes} from "../../utils/map-menus"

const LoginMoudle:Module<ILoginState,IRootState> = {
    namespaced:true,
    state(){
        return {
            token:"",
            userMenus:[]
        }
    },
    getters:{},
    mutations:{
        changeToken(state,token:string){
            state.token = token
        },
        changeMenus(state,userMenus:any){
            state.userMenus = userMenus
            console.log("动态加载路由")
           const routes = mapMenusToRoutes(userMenus)
           //console.log(routes)
           routes.forEach((route) => {
            //console.log(route)
            router.addRoute('main', route)
          })
        }
    },
    actions:{
        async accountLoginAction({commit},payload:IAccount){
            //console.log("vuex中的登录逻辑")
            //实现登录逻辑
            const loginResult = await accountLoginRequest(payload)
            //console.log(loginResult.data)
            const {token} = loginResult.data
            commit("changeToken",token)
            //console.log(id,name,token)
            LocalCache.setCache("token",token)
            //获取用户的菜单
            const userMenus:any = await requestUserMenusByRoleId()

            
            let arr:any = []
            userMenus.data.forEach((item:any)=>{
                item.children = []
                if(item.type === '1'){
                    arr.push(item)
                }
            })
           userMenus.data.forEach((item:any) => {
               arr.forEach((child:any) => {
                   if(child.id == item.parentId){
                       child.children.push(item)
                   }
               })
           })
           
            //console.log(arr)
            //console.log(userMenusData)
            commit("changeMenus",arr)
            LocalCache.setCache("menus",arr)
            //console.log(LocalCache.getCache("menus"))
            
            

            //跳转到首页
            router.push("/main/system/user")
        },
        loadLocalLogin({commit}){
            const token = LocalCache.getCache("token")
            if(token){
                commit("changeToken",token)
            }
            const userMenus = LocalCache.getCache("menus")
            if(userMenus){
                commit("changeMenus",userMenus)
                //console.log(userMenus)
            }
        }
    }
}

export default LoginMoudle