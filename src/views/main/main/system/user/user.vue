<template>
  <div class="user">
    <page-search 
    :searchFormConfig="searchFormConfig"
    @resetBtnClick="handleResetClick"
    @queryBtnClick="handleQueryClick" ></page-search>
    <page-content 
    ref="pageContentRef"
    :contentTableConfig="contentTableConfig" 
    :pageName="users"
    @newBtnClick="handleNewData"
    @editBtnClick="handleEditData"></page-content>
     <page-modal :defaultInfo="defaultInfo" :modalConfig="modalConfig" ref="pageModalRef" :pageName="users">
     </page-modal>
    
  </div>
</template>

<script lang="ts">
import { defineComponent,ref} from 'vue'
import PageModal from '@/components/page-modal'
import PageSearch from "@/components/page-search"
import {searchFormConfig} from "./config/search.config"
import PageContent from "@/components/page-content"

import {contentTableConfig} from "./config/content.config"
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/use-page-search'
import {usePageModal} from "@/hooks/use-page-modal"
export default defineComponent({
  components:{
    PageSearch,
    PageContent,
    PageModal
   
  },
  name: 'user',
  setup() {
    const users = "users"
     const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
     const newCallback = () => {
      
     }
     
     const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(item => item.field === 'password')
      passwordItem!.isHidden = true
      //console.log(passwordItem)
     }
     const [pageModalRef, defaultInfo, handleNewData, handleEditData] 
     = usePageModal(newCallback,editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      users,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped>

</style>
