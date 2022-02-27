import {ILoginState} from "./login/types"
import {ISystemState} from "@/store/main/system/types"
export interface IRootState {
  
  }

  export interface IRootWithModule {
    Login: ILoginState,
    system: ISystemState
  }
  export type IStoreType = IRootState & IRootWithModule