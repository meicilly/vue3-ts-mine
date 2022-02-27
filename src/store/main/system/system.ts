import {Module} from "vuex"
import {IRootState} from "@/store/types"
import { ISystemState } from './types'
import {getUserManager,deletePageData,editUserData,regesiterUser} from "@/service/main/system/system"

const systemMoudle:Module<ISystemState,IRootState> = {
    namespaced: true,
    state() {
      return {
        userList: [],
        userCount: 0,
        roleCount: 0,
        goodCount: 0,
        menuCount:0,
        menuList:[],
        goodList:[],
        roleList: []
      }
    },
    getters:{
      pageListData(state){
        return (pageName:string) => {
          switch(pageName){
            case 'users':
              return state.userList
              break
            case 'roles':
              return state.roleList
              break
            case 'goods':
              return state.goodList
            case "menus":
              return state.menuList
          }
        }
      },
      pageListCount(state) {
        return (pageName:string) => {
          switch(pageName){
            case 'users':
              return state.userCount
              break
            case 'roles':
              return state.roleCount
              break
            case "goods":
              return state.goodCount
            case "menus":
              return state.menuCount
          }
        }
      }
    },
    mutations: {
      changeusersList(state, userList: any[]) {
        state.userList = userList
      },
      changeusersCount(state, userCount: number) {
        state.userCount = userCount
      },
      changerolesList(state, roleList: any[]) {
        state.roleList = roleList
      },
      changerolesCount(state, roleCount: number) {
        state.roleCount = roleCount
      },
      changegoodsList(state, goodList: any[]) {
        state.goodList = goodList
      },
      changegoodsCount(state, goodCount: number) {
        state.goodCount = goodCount
      },
      changemenusList(state, menuList: any[]) {
        state.menuList = menuList
      },
      changemenusCount(state, menuCount: number) {
        state.menuCount = menuCount
      }
    },
    actions: {
      async getPageListAction({ commit }, payload: any) {
        //console.log(payload.pageUrl)
        //console.log(payload.queryInfo)
        const pageName = payload.pageName

        const pageUrl = `${pageName}/list`
  
        // 1.对页面发送请求
        const pageResult = await getUserManager(
          pageUrl,
          payload.queryInfo
        )
       //console.log(pageResult.data)
       const {arr,count} = pageResult.data.data
       //console.log(arr,count)
       commit(`change${pageName}List`, arr)
       commit(`change${pageName}Count`, count)
      },
      async deletePageDataAction({dispatch},payload:any){
        const {pageName,id} = payload
        const pageUrl = `/${pageName}/${id}`
        await deletePageData(pageUrl)
        dispatch("getPageListAction",{
          pageName,
          queryInfo:{
            offset: 0,
            limit: 10
          }
        })
      },
      async editPageDataAction({dispatch},payload:any){
        const {editData,pageName,id} = payload
        const Alldata = {id,...editData}
        const ReUrl = `/${pageName}/edit`
        await editUserData(ReUrl,Alldata)
        dispatch("getPageListAction",{
          pageName,
          queryInfo:{
            offset: 0,
            limit: 10
          }
        })
      },
      async createPageDataAction({dispatch},payload:any){
          const {pageName,newData} = payload
          const url = `${pageName}`
          console.log(pageName,newData)
          await regesiterUser(url,newData)
          dispatch("getPageListAction",{
            pageName,
            queryInfo:{
              offset: 0,
              limit: 10
            }
          })
      }
    }
}
export default systemMoudle