<template>
    <div class="nav-header">
       <div class="content">
            <i class="fold-menu"
           :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'" 
            @click="hadleFoldClick"
        ></i>
        <bread-crumb :breadcrumbs="breadcrumbs"></bread-crumb>
       </div>
        <div class="nav-info">
            <nav-info/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'
import {useStore} from "vuex"
import {useRoute} from "vue-router"
import NavInfo from "./nav-info.vue"
import BreadCrumb from "@/base-ui/breadcrumb"
import {pathMapBreadcrumbs} from "@/utils/map-menus"
export default defineComponent({
    components:{
        NavInfo,
        BreadCrumb
    },
    emits:["foldChange"],
    setup (props,{emit}) {
        const store = useStore()
        const route = useRoute()
        const isFold = ref(false)
        const hadleFoldClick = () => {
            isFold.value = !isFold.value
             emit('foldChange', isFold.value)
        }
        
        const breadcrumbs = computed(() => {
            const userMenus = store.state.Login.userMenus
            //console.log(userMenus.value)
            const currentPath = route.path
            return pathMapBreadcrumbs(userMenus,currentPath)
        })
        //console.log(breadcrumbs.value)
        return {
            isFold,
            hadleFoldClick,
            breadcrumbs
        }
    }
})
</script>

<style scoped lang="less">
.nav-header {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content:space-between;
    align-items: center;
    .content{
        display: flex;
        align-items:center;
    }
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    
  }
}
</style>