<template>
    <div class="login-account">
        <el-form label-width="80px" :rules="rules" :model="account" ref="formRef">
            <el-form-item  label="账号" prop="name">
                <el-input v-model="account.name"></el-input>
            </el-form-item>
             <el-form-item  label="密码" prop="password">
                <el-input v-model="account.password" show-password></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,ref } from 'vue'
import {useStore} from "vuex"
import {IAcount} from './types/types'
import { ElForm } from 'element-plus'
import {rules} from "./config/account-config"
import LocalCache from '../../../utils/cache'

export default defineComponent({
    setup () {
        const store = useStore()
        const account:IAcount = reactive({
            name:LocalCache.getCache("name") ??'lixiaohai',
            password:LocalCache.getCache("password") ?? '123456'
        })
        const formRef = ref<InstanceType<typeof ElForm>>()
        const loginAccount = (isRemmberPassword:boolean) => {
            formRef.value?.validate((valid) => {
                //console.log(valid)
               if(valid){
                    if(isRemmberPassword){
                    LocalCache.setCache("name",account.name)
                    LocalCache.setCache("password",account.password)
                }else {
                    LocalCache.deleteCache("name")
                    LocalCache.deleteCache("password")
                }
                store.dispatch("Login/accountLoginAction",{...account})
               }
            })

            
        }

        return {
             account,
             rules,
             formRef,
             loginAccount
        }
    }
})
</script>

<style scoped>

</style>