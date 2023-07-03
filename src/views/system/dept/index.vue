<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="部门名称">
            <el-input v-model="queryForm.name" clearable placeholder="请输入部门名称"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" clearable placeholder="请选择状态">
              <el-option label="启用" :value="1"/>
              <el-option label="禁用" :value="0"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label-width="0">
            <el-button type="primary" @click="onSearch">
              <el-icon>
                <ele-search/>
              </el-icon>
              <span class="search-btn__left">查询</span>
            </el-button>
            <el-button @click="onReset">
              <el-icon>
                <ele-refresh/>
              </el-icon>
              <span class="search-btn__left">重置</span>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--    新 增-->
    <div class="table-btn-box mb10">
      <el-button type="primary" @click="openDialog">
        <el-icon class="mr5">
          <ele-circle-plus/>
        </el-icon>
        新 增
      </el-button>
    </div>
    <!--    表格-->
    <el-table :data="tableData.data" border style="width: 100%" row-key="id" default-expand-all>
      <el-table-column prop="name" label="部门名称" width="300"/>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status" type="success" disable-transitions>启用</el-tag>
          <el-tag v-else type="danger" disable-transitions>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"/>
      <el-table-column prop="createTime" label="添加时间" align="center"/>
      <el-table-column label="操作" fixed="right" align="center">
        <template #default="{row}">
          <el-button link type="primary" @click="openDialog(row)">
            修改
          </el-button>
          <el-button @click="delTable(row)" link type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    添加，编辑弹框-->
    <TableForm ref="tableDialogRef" @refresh="getTableList"/>
  </el-card>
</template>
<script lang="ts" setup>
import {deleteSysDept, getAllSysDeptTreeList} from "@/api/dept";
import {ElMessage, ElMessageBox} from 'element-plus'
import TableForm from './table-form.vue'

/** 查询*/
let queryForm = ref({})
// 查询
const onSearch = () => {
  getTableList();
}
// 重置
const onReset = () => {
  queryForm.value = {}
  getTableList();
}

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
})
// 获取表格列表
const getTableList = () => {
  getAllSysDeptTreeList({...queryForm.value}).then(res => {
    tableData.data = res || [];
  })
}
/** 删除*/
const delTable = (row: any) => {
  ElMessageBox.confirm(
      '是否确认删除本条数据？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        deleteSysDept(row.id).then(() => {
          ElMessage.success('删除成功');
          getTableList();
        })
      }).catch(() => {
  })
}


/** 添加，编辑弹框*/
const tableDialogRef = ref()
// 打开弹框
const openDialog = async (row: any = {}) => {
  await tableDialogRef.value.openDialog(row);
}


getTableList();
</script>
<style></style>
