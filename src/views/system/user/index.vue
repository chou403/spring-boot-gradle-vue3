<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="80px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="用户名">
            <el-input v-model="queryForm.username" clearable placeholder="请输入用户名"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="昵称">
            <el-input v-model="queryForm.nickname" clearable placeholder="请输入昵称"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="手机号码">
            <el-input v-model="queryForm.phone" clearable maxlength="11" placeholder="请输入手机号码"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="角色">
            <el-select v-model="queryForm.roleId" clearable placeholder="请选择角色">
              <el-option v-for="item in roleList" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" clearable placeholder="请选择状// 定义一个tableConfig类型，用于配置表格
type tableConfig = {
  // 初始化参数
  initParam?: Object
  // 请求函数，参数为任意类型，返回值为Promise类型
  request: (params: any) => Promise<any>
  // 是否立即执行
  immediate?:boolean
}

// 定义props，用于接收配置和列的参数
const props = defineProps<{
  config: tableConfig
  columns: columnsType[]
}>()

// 使用useTable函数，传入配置参数，获取表格数据
const {tableData, pagination,search, loading, changePage, getTableData} = useTable({
  // 请求函数，参数为任意类型，返回值为Promise类型
  request: props.config.request,
  // 初始化参数，默认为空对象
  initParam: props.config?.initParam||{},
  // 是否立即执行
  immediate:  props.config.immediate
})

// 定义一个接口，用于暴露表格数据和搜索参数
defineExpose({
  getTableData,
  search
})ime"/>
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
    <el-table :data="tableData.data" border style="width: 100%" row-key="id" @sort-change="sortChange">
      <el-table-column prop="username" label="用户名" align="center"/>
      <el-table-column prop="nickname" label="昵称" align="center"/>
      <el-table-column prop="roleName" label="角色" align="center"/>
      <el-table-column prop="phone" label="手机号码" align="center" width="150"/>
      <el-table-column prop="email" label="邮箱" align="center" width="180"/>
      <el-table-column prop="gender" label="性别" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.gender===0" type="danger" disable-transitions>女</el-tag>
          <el-tag v-else-if="scope.row.gender===1" type="success" disable-transitions>男</el-tag>
          <el-tag v-else type="info" disable-transitions>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status" type="success" disable-transitions>启用</el-tag>
          <el-tag v-else type="danger" disable-transitions>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" sortable="custom" label="创建时间" align="center" width="180"/>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template #default="{row}">
          <template v-if="!row.isAdmin">
            <el-button link type="primary" @click="openDialog(row)">
              修改
            </el-button>
            <el-button link type="primary" @click="openPswDialog(row)">
              重置密码
            </el-button>
            <el-button @click="delTable(row)" link type="danger">
              删除
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <CustomPagination v-model:currentPage="pageData.pageIndex" v-model:pageSize="pageData.pageSize"
                      :total="pageData.total" @changePage="changePage"/>

    <!--    添加，编辑弹框-->
    <TableForm ref="tableDialogRef" @refresh="getTableList" :roleList="roleList"/>

    <!--    重置密码-->
    <ResetPassword ref="passwordDialogRef"/>
  </el-card>
</template>
<script lang="ts" setup>
import {deleteSysUser, getSysUserList} from "@/api/user";
import {ElMessage, ElMessageBox} from 'element-plus'
import TableForm from './table-form.vue'
import ResetPassword from './reset-password.vue'
import {getSysRoleAllList} from "@/api/role";

/** 查询*/
let queryForm = ref({})
// 查询
const onSearch = () => {
  pageData.pageIndex = 1;
  getTableList();
}
// 重置
const onReset = () => {
  queryForm.value = {}
  pageData.pageIndex = 1;
  getTableList();
}

/** 分页*/
// 分页数据
const pageData = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0
})
// 翻页
const changePage = (page: number) => {
  pageData.pageIndex = page;
  getTableList();
}

/** 排序*/
const orderBy = ref({})

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
})
// 获取表格列表
const getTableList = () => {
  getSysUserList({...pageData, ...queryForm.value, orderBy: {...orderBy.value}}).then(res => {
    tableData.data = res.list || [];
    pageData.total = res.total;
  })
}
// 删除
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
        deleteSysUser(row.id).then(() => {
          ElMessage.success('删除成功');
          getTableList();
        })
      }).catch(() => {
  })
}
// 排序
const sortChange = ({column, prop, order}) => {
  if (order) {
    orderBy.value.column = "create_time";
    orderBy.value.asc = order === "ascending";
  } else {
    orderBy.value = {}
  }

  pageData.pageIndex = 1;
  getTableList();
}

/** 角色信息*/
const roleList = ref([])
// 获取角色数据
const getRoleList = () => {
  return new Promise((resolve) => {
    getSysRoleAllList({}).then(res => {
      roleList.value = res || [];
      resolve(roleList.value)
    })
  })
}

/** 添加，编辑*/
const tableDialogRef = ref()
// 打开弹框
const openDialog = async (row: any = {}) => {
  await tableDialogRef.value.openDialog(row);
}

/** 重置密码*/
const passwordDialogRef = ref()
// 打开弹框
const openPswDialog = async (row: any) => {
  await passwordDialogRef.value.openPswDialog(row);
}

getRoleList();
getTableList();
</script>
<style></style>
