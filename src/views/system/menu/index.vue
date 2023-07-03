<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="菜单名称">
            <el-input v-model="queryForm.name" clearable placeholder="请输入菜单名称"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="权限编码">
            <el-input v-model="queryForm.code" clearable placeholder="请输入权限编码"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="路由">
            <el-input v-model="queryForm.routeUrl" clearable placeholder="请输入路由"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="菜单类型">
            <el-select v-model="queryForm.type" clearable placeholder="请选择菜单类型">
              <el-option label="导航菜单" :value="1"/>
              <el-option label="菜单" :value="2"/>
              <el-option label="权限" :value="3"/>
            </el-select>
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
    <el-table :data="tableData.data" border style="width: 100%" row-key="id" :expand-row-keys="expandRowKeys">
      <el-table-column prop="name" label="菜单名称" width="300">
        <template #default="scope">
          <div class="flex-inline flex item-center">
            <template v-if="scope.row.icon?.indexOf('local')>=0">
              <SvgIcon :name="scope.row.icon"/>
            </template>
            <el-icon v-else>
              <component :is="scope.row.icon"></component>
            </el-icon>
            <span class="ml3">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="权限标识" align="center" width="150"/>
      <el-table-column prop="type" label="类型" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.type===1" disable-transitions>菜单</el-tag>
          <el-tag v-else-if="scope.row.type===2" type="success" disable-transitions>外链</el-tag>
          <el-tag v-else type="warning" disable-transitions>权限</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="routeUrl" label="路由" align="center"/>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status===true" type="success" disable-transitions>启用</el-tag>
          <el-tag v-else type="danger" disable-transitions>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"/>
      <el-table-column prop="createTime" label="创建时间" align="center" width="200"/>
      <el-table-column label="操作" fixed="right" align="center" width="200">
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
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteSysMenu, getAllSysMenuTreeList} from "@/api/menu";
import SvgIcon from '@/components/SvgIcon/index.vue'
import TableForm from './table-form.vue'


/** 查询*/
let queryForm = ref({})
// 查询
const onSearch = () => {
  getTableList();
}
// 查询
const onReset = () => {
  queryForm.value = {}
  getTableList();
}

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
})
// 默认展开第一级
const expandRowKeys = computed(() => {
  return tableData.data.map((p: any) => p.id)
})
// 获取表格列表
const getTableList = () => {
  getAllSysMenuTreeList({...queryForm.value}).then(res => {
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
        deleteSysMenu(row.id).then(() => {
          ElMessage.success('删除成功');
          getTableList();
        })
      }).catch(() => {
  })
}


/** 添加，编辑*/
const tableDialogRef = ref()
// 打开弹框
const openDialog = async (row: any = {}) => {
  await tableDialogRef.value.openDialog(row);
}

getTableList();
</script>
<style></style>
