<template>
    <div class="table">
      <div class="header">
      <slot name="header">
        <div class="title">用户列表</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
      </div>
        <el-table 
        :data="listData" 
        border 
        style="width:100%" 
        @selection-change="handleSelectionChange"
       >
          <el-table-column 
          v-if="showSelectColimn" 
          type="selection" 
          align="center"
          width="60"></el-table-column>
          <el-table-column v-if="showIndexColumn" 
          type="index" 
          label="序号" 
          align="center"
          width="80">
          </el-table-column>
           <template v-for="propItem in propList" :key="propItem.prop">
            <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
            <template #default="scope">
                <slot :name="propItem.slotName" :row="scope.row">
                {{ scope.row[propItem.prop] }}
                </slot>
            </template>
            </el-table-column>
        </template>
        </el-table>
        <div v-if="showFooter" class="footer">
          <slot name="footer">
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listCount"
    >
    </el-pagination>
          </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
         listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    listCount:{
      type: Number,
      default: 0
    },
    showIndexColumn:{
      type:Boolean,
      default:true
    },
    showSelectColimn:{
      type:Boolean,
      default:false
    },
    page:{
      type:Object,
      default:() => ({currentPage: 1,pageSize: 5})
    },
    showFooter:{
      type:Boolean,
      default:true
    }
    },
    emits:['selectionChange','update:page'],
    setup (props,{emit}) {
        const handleSelectionChange = (value:any) => {
          console.log(value)
          emit("selectionChange",value)
        }
         const handleCurrentChange = (currentPage: number) => {
          emit('update:page', { ...props.page, currentPage })
        }

        const handleSizeChange = (pageSize: number) => {
          emit('update:page', { ...props.page, pageSize })
        }

        return {
          handleSelectionChange,
          handleSizeChange,
          handleCurrentChange
        }
    }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>