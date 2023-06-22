<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="部门名称">
            <el-input v-model="queryForm.name" placeholder="请输入部门名称"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" placeholder="请选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
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
    <div v-if="dialogData.isShow">
      <el-dialog :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
        <el-form ref="formRef" :model="form" label-width="90px" :rules="rules">
          <el-row>
            <el-col>
              <el-form-item label="上级部门">
                <custom-cascader v-model:value="form.parentId" :options="deptList" placeholder="请选择上级部门"/>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="部门名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入部门名称"/>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="排序" prop="sort">
                <el-input v-model="form.sort" type="number" placeholder="请输入排序"/>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="状态" prop="status">
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
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import {
  addSysDept,
  deleteSysDept,
  getSysDept,
  getAllSysDeptTreeList,
  updateSysDept,
  getSysDeptTreeList
} from "@/api/dept";
import {reactive, ref} from "vue";
import {getCascadeParent} from "@/utils";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

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


/** 添加，编辑*/
// 表单
let form: any = ref({
  status:1
});
// 效验规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
  ],
  sort: [
    { required: true, message: '请输入排序', trigger: 'blur' },
  ],
})
// 部门信息
const deptList = ref([])
// 获取部门数据
const getDeptList = () => {
  return new Promise((resolve) => {
    getSysDeptTreeList({}).then(res => {
      deptList.value = res || [];
      resolve(deptList.value)
    })
  })
}
// 获取详情
const getDetails = (id: number | string) => {
  getSysDept(id).then(res => {
    form.value = Object.assign({}, form.value, res);
  })
}
// 弹框数据
const dialogData = reactive({
  isShow: false,
  title: "新增部门",
  id: null,
})
// 打开弹框
const openDialog =async (row: any) => {
  dialogData.isShow = true;
  dialogData.title = '新增部门';
  await getDeptList();
  if (row?.id) {
    dialogData.id = row.id;
    dialogData.title = '编辑部门';
    getDetails(row.id);
  }
}
// 关闭弹框
const closeDialog = () => {
  dialogData.isShow = false;
  dialogData.id = null;
  form.value = {
    status:1
  };
}
// 提交
const submit =async () => {
  if(!formRef.value)return;
  await formRef.value.validate((valid) => {
    if (valid) {
      if (form.value.id) {
        updateSysDept(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      } else {
        addSysDept(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      }
    }
  })
}

getTableList();
</script>
<style></style>
