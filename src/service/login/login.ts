import hyRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login', // 用法: /users/1
  UserMenus = '/menu' // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  //console.log(account)
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}


export function requestUserMenusByRoleId() {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus,
    showLoading: false
  })
}
