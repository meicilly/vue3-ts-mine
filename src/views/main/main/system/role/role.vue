<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content 
      :contentTableConfig="contentTableConfig"
      pageName="roles"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"
import {searchFormConfig} from "./config/search.config"
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageContent,
    PageSearch
  },
  name: 'role',
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
