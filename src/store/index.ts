import { createStore,Store, useStore as useVuexStore } from 'vuex'
import {IRootState,IStoreType} from "./types"

import Login from "./login/login"
import System from "./main/system/system"

const store = createStore<IRootState>({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Login,
    System
  }
})


export function setupStore(){
  store.dispatch("Login/loadLocalLogin")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store