<template>
  <el-card shadow="never" style="height: 100%" :body-style="{height:'100%',padding:'10px'}">
    <CustomSearch v-if="search" :options="search.options" @onSearch="tableSearch"/>
    <CustomTable :data="data.tableData" :columns="props.columns" :operations="props.operations" @refresh="tableRefresh">
      <template #operate>
        <slot name="operate"></slot>
      </template>
    </CustomTable>
    <CustomPagination v-model:currentPage="data.paginationData.pageIndex" v-model:pageSize="data.paginationData.pageSize" :total="data.paginationData.total" @changeSize="changeSize"/>
  </el-card>
</template>

<script lang="ts" setup>
import {http} from '@/utils/http'
import {columnsType, operationsType} from "@/components/Custom/types";
import {onMounted, reactive} from "vue";
import {ListResultType} from "@/api/types";
import {formatCascade} from "@/utils";

const props=defineProps<{
  columns:Array<columnsType>
  operations?:operationsType|undefined,
  search?:any
}>()


let data:any=reactive({
  tableData:[],
  params:{},
  paginationData:{
    pageIndex:1,
    total:0,
    pageSize:props.operations?.getOptions?.pageSize||10,
  }
})

/** 翻页*/
const changeSize = (page:number) => {
  data.paginationData.pageIndex=page;
  getList();
}

/** 获取列表数据*/
function getList() {
  if(props.operations?.getOptions){
    http.post<ListResultType>(props.operations.getOptions.url,{
      pageIndex:data.paginationData.pageIndex,
      pageSize:data.paginationData.pageSize,
      ...data.params
    }).then((res)=>{
      if(props.operations?.getOptions?.type=="tree"){
        data.tableData=formatCascade(res.list)
      }else{
        data.tableData=res.list;
      }
      data.paginationData.total=res.total;
    })
  }
}

/** 刷新表格*/
function tableRefresh() {
  data.paginationData.pageIndex=1;
  getList();
}

/** 刷新表格*/
function tableSearch(params:any) {
  data.params=params;
  data.paginationData.pageIndex=1;
  getList();
}

onMounted(()=>{
  getList();
})
</script>

<style lang="scss" scoped>

</style>
