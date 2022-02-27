<template>
    <div class="page-search">
     <xh-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
        </template>
        <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleRestClick">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
     </xh-form>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import XhForm from "@/base-ui/form"
export default defineComponent({
    props:{
        searchFormConfig:{
            type:Object,
            required:true
        }
    },
    components:{
        XhForm
    },
    emits:["queryBtnClick",'resetBtnClick'],
    setup (props,{emit}) {
      const formItems = props.searchFormConfig?.formItems ?? []
      const formOriginData:any = {}
      for(const item of formItems){
          formOriginData[item.field] = ''
      }
      const formData = ref(formOriginData)
    //console.log(props)
       const handleRestClick = () => {
          formData.value = formOriginData
          emit('resetBtnClick')
      //    for (const key in formOriginData) {
      //    formData.value[`${key}`] = formOriginData[key]
      //  }
       } 
         const handleQueryClick = () => {
            emit('queryBtnClick', formData.value)
          }
        return {
            formData,
            handleRestClick,
            handleQueryClick 
        }
    }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>