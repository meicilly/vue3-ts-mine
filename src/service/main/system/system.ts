import xhRequest from "@/service"

import {IDataType} from "../../login/types"
export function getUserManager(url:string,queryInfo:any){
   return xhRequest.post<IDataType>({
        url:url,
        data:queryInfo
    })
}

export function deletePageData(url: string) {
    return xhRequest.delete<IDataType>({
      url: url
    })
  }

  export function editUserData(url:string,data:any){
    return xhRequest.post<IDataType>({
      url: url,
      data:data
    })
  }

  export function regesiterUser(url:string,data:any){
    return xhRequest.post<IDataType>({
      url: url,
      data:data
    })
  }