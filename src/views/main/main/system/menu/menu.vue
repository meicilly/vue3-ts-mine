<template>
  <div class="menu">
     <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menus"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'
export default defineComponent({
  components: {
    PageContent
  },
  name: 'menu',
  setup() {
    const menus = "menus"
    return {
      contentTableConfig,
      menus
    }
  }
})
</script>

<style scoped></style>
