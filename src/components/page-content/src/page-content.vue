<template>
    <div class="page-content">
    <xhtable 
      :listData="dataList" 
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo">
      <template #headerHandler>
        <el-button type="primary" size="medium"
        @click="handleNewClick">新建用户</el-button>
      </template>
         <template #status="scope">
          <el-button 
          size="mini"
          :type="scope.row.enable ? 'success':'danger'">{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
        </template>
         <template #updateAt="scope">
          <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
        </template>
        <template #handler="scope">
          <div class="handle-btns">
            <el-button icon="el-icon-edit" size="mini" type="text"
            @click="handleEditClick(scope.row)">编辑</el-button>
            <el-button 
            icon="el-icon-delete" 
            size="mini" 
            type="text"
            @click="handleDeleteClick(scope.row)">删除</el-button>
          </div>
        </template>
        <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
        <template #footer>

        </template>
      </xhtable>
    </div>
</template>

<script lang="ts">
import { defineComponent,computed,ref,watch } from 'vue'
import {useStore} from "vuex"
import xhtable from "@/base-ui/table"
export default defineComponent({
    props:{
        contentTableConfig:{
          type: Object,
          required: true
        },
        pageName:{
          type: String,
          required:true
        }
    },
    components:{
        xhtable
    },
    emits:['newBtnClick','editBtnClick'],
    setup (props,{emit}) {
      //console.log(props.pageName)
      const store = useStore()
      
      const pageInfo = ref({ currentPage: 1, pageSize: 5 })
      watch(pageInfo, () => getPageData())
      const getPageData = (queryInfo:any = {}) => {
            store.dispatch("System/getPageListAction",{
            pageName: props.pageName,
            queryInfo: {
            offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
            limit: pageInfo.value.pageSize,
            ...queryInfo
      }  
    })
      }
    getPageData()
    //const userList = computed(() => store.state.System.userList)
      const dataList = computed(() => store.getters[`System/pageListData`](props.pageName))
      const dataCount = computed(() =>
      store.getters[`System/pageListCount`](props.pageName)
        )
        //console.log(dataCount)
         // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    //删除操作
    const handleDeleteClick = (item:any) => {
      //console.log(item)
      store.dispatch('System/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    
     const handleNewClick = () => {
      emit('newBtnClick')
    }
     const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
        return {
            dataList,
            getPageData,
            dataCount,
            pageInfo,
            otherPropSlots,
            handleDeleteClick,
            handleNewClick,
            handleEditClick
        }
    }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>