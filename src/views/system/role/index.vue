<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="角色名称">
            <el-input v-model="queryForm.name" placeholder="请输入角色名称"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="角色编码">
            <el-input v-model="queryForm.code" placeholder="请输入角色编码"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" placeholder="请选择状态">
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
    <el-table :data="tableData.data" border style="width: 100%" row-key="id">
      <el-table-column prop="name" label="角色名称" align="center"/>
      <el-table-column prop="code" label="角色编码" align="center"/>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status===true" type="success" disable-transitions>启用</el-tag>
          <el-tag v-else type="danger" disable-transitions>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"/>
      <el-table-column label="操作" fixed="right" align="center">
        <template #default="{row}">
          <el-button link type="primary" @click="openDialog(row)">
            修改
          </el-button>
          <el-button link type="primary" @click="openAuthDialog(row)">
            授权
          </el-button>
          <el-button @click="delTable(row)" link type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <CustomPagination v-model:currentPage="pageData.pageIndex" v-model:pageSize="pageData.pageSize"
                      :total="pageData.total" @changePage="changePage"/>

    <!--    添加，编辑弹框-->
    <div v-if="dialogData.isShow">
      <el-dialog :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
          <el-row>
            <el-col>
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入角色名称"/>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="角色编码" prop="code">
                <el-input v-model="form.code" placeholder="请输入角色编码"/>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                  <el-radio :label="true" border>启用</el-radio>
                  <el-radio :label="false" border>禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <!--    授权弹框-->
    <el-dialog width="500px" :model-value="authData.isShow" destroy-on-close title="分配权限" @closed="closeAuthDialog">
      <div class="menu-tree">
        <el-tree
            ref="authRef"
            :data="authData.data"
            node-key="id"
            :props="props"
            default-expand-all
            show-checkbox
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitAuth">确定</el-button>
          <el-button @click="closeAuthDialog">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";
import {
  addSysRole,
  deleteSysRole,
  getMenuIdsByRoleId,
  getSysRole,
  getSysRoleList,
  setRoleMenus,
  updateSysRole
} from "@/api/role";
import {getSysMenuTreeList} from "@/api/menu";

const formRef = ref<FormInstance>()

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

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
})
// 获取表格列表
const getTableList = () => {
  getSysRoleList({...pageData, ...queryForm.value}).then(res => {
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
        deleteSysRole(row.id).then(() => {
          ElMessage.success('删除成功');
          getTableList();
        })
      }).catch(() => {
  })
}

/** 添加，编辑*/
// 表单
let form: any = ref({
  status: true
})
// 效验规则
const rules = reactive<FormRules>({
  name: [
    {required: true, message: '请输入部门名称', trigger: 'blur'},
  ],
  code: [
    {required: true, message: '请输入角色编码', trigger: 'blur'},
  ],
})
const getDetails = (id: number | string) => {
  getSysRole(id).then(res => {
    form.value = Object.assign({}, form.value, res);
  })
}
// 弹框数据
const dialogData = reactive({
  isShow: false,
  title: "新增",
  id: null,
})
// 打开弹框
const openDialog = async (row: any) => {
  dialogData.isShow = true;
  dialogData.title = '新增';
  if (row?.id) {
    dialogData.id = row.id;
    dialogData.title = '编辑';
    getDetails(row.id);
  }
}
// 关闭弹框
const closeDialog = () => {
  dialogData.isShow = false;
  dialogData.id = null;
  form.value = {status: true};
}
// 提交
const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      if (form.value.id) {
        updateSysRole(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      } else {
        addSysRole(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      }
    }
  })

}

/** 授权*/
const authRef = ref()
const props = {
  label: 'name',
}
let authData = reactive({
  isShow: false,
  id:null,
  data: []
})
// 获取角色权限
const getRoleAuth = () => {
  getMenuIdsByRoleId(authData.id).then(res=>{
    authRef.value.setCheckedKeys(res)
  })
}
// 打开授权弹框
const openAuthDialog = (row: any) => {
  getSysMenuTreeList({}).then((res: any) => {
    authData.data = res || [];
  })
  if(row?.id){
    authData.id=row.id
    getRoleAuth();
  }
  authData.isShow = true;
}
// 关闭授权弹框
const closeAuthDialog = () => {
  authData.isShow = false;
  authData.id=null;
}
// 提交
const submitAuth = () => {
  if(authData.id){
    let params={
      roleId:authData.id,
      menuIds:authRef.value.getCheckedKeys()
    }
    if(params.menuIds.length>0){
      setRoleMenus(params).then(()=>{
        ElMessage.success('设置成功')
        closeAuthDialog();
      })
    }else{
      ElMessage.error('请选择角色权限')
    }
  }
}

getTableList();
</script>
<style></style>
