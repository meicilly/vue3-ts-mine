<template>
    <div class="login-panel">
        <h1 class="title">后台电商管理系统</h1>
        <el-tabs type="border-card" stretch v-model="currentTab" class="eltab">
            <el-tab-pane name="account">
                <template #label>
                    <span>
                        <span><i class="el-icon-user-solid"></i>账号登录</span>
                    </span>
                </template>
                <login-account ref="accountRef"></login-account>
            </el-tab-pane>
            <el-tab-pane name="phone">
                <template #label>
                    <span>
                        <span><i class="el-icon-mobile-phone"></i>手机登录</span>
                    </span>
                </template>
            </el-tab-pane> 
         </el-tabs>
         <!-- 复选框 -->
             <div class="control">
                 <el-checkbox v-model="rememberPassword" label="记住密码"></el-checkbox>
                 <el-link type="primary">忘记密码</el-link>
             </div>
             <div class="btn">
                 <el-button class="butn" type="primary" @click="handleLoginClick">登录</el-button>
             </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import LoginAccount from "./login-account.vue"
export default defineComponent({
    components:{
        LoginAccount
    },
    setup () {
        const rememberPassword = ref(true)
        //拿到组件的实例
        const accountRef = ref<InstanceType<typeof LoginAccount>>()
        //2.定义方法
        const currentTab = ref('account')
        const handleLoginClick = () => {
            if(currentTab.value === 'account'){
                accountRef.value?.loginAccount(rememberPassword.value)
            }
        }
        return {
            rememberPassword,
            handleLoginClick,
            currentTab,
            accountRef
        }
    }
})
</script>

<style scoped lang="less">
.login-panel {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    .eltab {
        width:320px;
    }
    .control {
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items: center;
        margin-top:30px;
    }
    .btn{
        display:flex;
        margin-top:10px;
        width:320px;
        .butn{
            width:100%;
        }
    }
}

</style>