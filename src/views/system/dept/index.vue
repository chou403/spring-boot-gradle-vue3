<template>
  <el-card shadow="never" style="height: 100%" :body-style="{height:'100%',padding:'10px'}">
    <custom-search :options="options" @onSearch="onSearch"/>
    <custom-table :data="tableData.data" :operations="tableData.operations" :columns="tableData.columns" @refresh="getTableList"/>
    <custom-pagination v-model:currentPage="pageParams.pageIndex" v-model:pageSize="pageParams.pageSize" :total="pageParams.total" @changeSize="changeSize"/>
  </el-card>
</template>

<script lang="ts" setup>
import {getSysDeptListApi} from "@/api/system";
import {reactive, ref} from "vue";
import {formatCascade} from "@/utils";

/** 搜索*/
const options=[
  {
    label: '用户名',
    name: 'username',
    placeholder: '请输入用户名',
    type: 'input'
  },
  {
    label: '昵称',
    name: 'nickname',
    placeholder: '请输入昵称',
    type: 'input'
  }
]
// 搜索参数
let searchParams=ref({
})
// 搜索
const onSearch = (value:any) => {
  searchParams.value=value;
  pageParams.pageIndex=1;
  getTableList();
}

/** 分页*/
// 分页参数
const pageParams=reactive({
  pageIndex:1,
  pageSize:99999,
  total:0
})
// 翻页
const changeSize = (page:number) => {
  pageParams.pageIndex=page;
  getTableList();
}

/** 表格*/
// 表格数据
const tableData=reactive({
  data:[],
  columns: [
    {
      label: '部门名称',
      name: 'name',
      width:300
    },
    {
      label: '状态',
      name: 'status',
      tagConfig: {
        0: {
          color: 'danger',
          text: '禁用'
        },
        1: {
          color: 'success',
          text: '启用'
        },
      }
    },
    {
      label: '排序',
      name: 'sort',
    },
  ],
  operations:{
    configure: [
      {
        label: '上级部门',
        name: 'parentId',
        placeholder: '请选择上级部门',
        span: 24,
        type: 'cascade',
        custom:{
          url:'/sysDept/getSysDeptList'
        }
      },
      {
        label: '部门名称',
        name: 'name',
        placeholder: '请输入部门名称',
        span: 24,
        type: 'input'
      },
      {
        label: '排序',
        name: 'sort',
        placeholder: '请输入排序',
        span: 24,
        type: 'number'
      },
      {
        label: '状态',
        name: 'status',
        type: 'radio',
        span: 24,
        options: [
          {
            name: '启用',
            id: 1,
          },
          {
            name: '禁用',
            id: 0,
          }
        ]
      },
    ],
    addOptions: {
      url: '/sysDept/addSysDept',
    },
    editOptions:{
      url:'/sysDept/updateSysDept'
    },
    delOptions:{
      url:'/sysDept/deleteSysDept/'
    },
    detailOptions:{
      url:'/sysDept/getSysDept/'
    }
  }
})
// 获取表格数据
const getTableList = () => {
  getSysDeptListApi({...pageParams,...searchParams}).then(res=>{
    tableData.data=formatCascade(res.list||[]);
    pageParams.total=res.total||0;
  })
}
getTableList();
</script>

<style lang="scss" scoped>

</style>
