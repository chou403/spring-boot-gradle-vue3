<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="80px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="用户名">
            <el-input v-model="queryForm.username" placeholder="请输入用户名"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="用户昵称">
            <el-input v-model="queryForm.nickname" placeholder="请输入用户昵称"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="手机号">
            <el-input v-model="queryForm.phone" maxlength="11" placeholder="请输入手机号"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="角色">
            <el-select v-model="queryForm.roleId" placeholder="请选择角色">
              <el-option v-for="item in roleList" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="部门">
            <custom-tree-select v-model:value="queryForm.deptId" :options="deptList" placeholder="请选择部门"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" placeholder="请选择状态">
              <el-option label="启用" :value="true"/>
              <el-option label="禁用" :value="false"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="创建时间">
            <custom-date-picker type="daterange" v-model:startDate="queryForm.createStartTime"
                                v-model:endDate="queryForm.createEndTime"/>
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
      <el-table-column prop="deptName" label="部门" align="center"/>
      <el-table-column prop="phone" label="手机号" align="center" width="150"/>
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
      <el-table-column prop="createTime" sortable label="创建时间" align="center" width="180"/>
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
    <div v-if="dialogData.isShow">
      <el-dialog :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" :disabled="!!form.id" placeholder="请输入用户名"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname" placeholder="请输入昵称"/>
              </el-form-item>
            </el-col>
            <el-col v-if="!form.id" :span="12">
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门">
                <custom-cascader v-model:value="form.deptId" :options="deptList" placeholder="请选择部门"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="角色" prop="roleIds">
                <el-select v-model="form.roleIds" multiple clearable placeholder="请选择角色">
                  <el-option v-for="item in roleList" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                  <el-radio :label="1" border>男</el-radio>
                  <el-radio :label="0" border>女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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

    <!--    重置密码-->
    <el-dialog width="400px" :model-value="pswData.isShow" destroy-on-close title="重置密码" @closed="closePswDialog">
      <el-form :model="pswData" ref="pswFormRef" :rules="pswRules" label-width="90px">
        <el-row>
          <el-col>
            <el-form-item label="用户名">
              <el-input v-model="pswData.row.username" disabled/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="昵称">
              <el-input v-model="pswData.row.nickname" disabled/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="pswData.password" type="password" placeholder="请输入新密码"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="resetPsw">确定</el-button>
          <el-button @click="closePswDialog">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {addSysUser, deleteSysUser, getSysUser, getSysUserList, resetSysUserPassword, updateSysUser} from "@/api/user";
import {getSysDeptTreeList} from "@/api/dept";
import md5 from "js-md5"
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
import {validateEmail, validatePhoneNumber} from "@/utils/validate";
import {getSysRoleAllList} from "@/api/role";
import Avatar from "@/components/avatar/index.vue"

const formRef = ref<FormInstance>()


/** 查询*/
let queryForm = ref({
})
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
const orderBy=ref({})

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
})
// 获取表格列表
const getTableList = () => {
  getSysUserList({...pageData, ...queryForm.value,orderBy:{...orderBy.value}}).then(res => {
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
const sortChange = ({ column, prop, order }) => {
  console.log(column, prop, order)
  if(order){
    orderBy.value.column="create_time";
    orderBy.value.asc=order==="ascending";
  }else{
    orderBy.value={}
  }

  pageData.pageIndex = 1;
  getTableList();
}

/** 添加，编辑*/
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
// 角色信息
const roleList = ref([])
// 获取部门数据
const getRoleList = () => {
  return new Promise((resolve) => {
    getSysRoleAllList({}).then(res => {
      roleList.value = res || [];
      resolve(roleList.value)
    })
  })
}
// 表单
let form: any = ref({
  gender: 1,
  status: true,
})
// 效验规则
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  nickname: [
    {required: true, message: '请输入昵称', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 12, message: '密码长度应为6到12位', trigger: 'blur'}
  ],
  phone: [
    {validator: validatePhoneNumber, trigger: 'blur'},
  ],
  email: [
    {validator: validateEmail, trigger: 'blur'},
  ],
  roleIds: [
    {required: true, message: '请选择角色', trigger: 'blur'},
  ],
})
// 获取详情
const getDetails = (id: number | string) => {
  getSysUser(id).then(res => {
    form.value = Object.assign({}, form.value, res);
  })
}
// 弹框数据
const dialogData = reactive({
  isShow: false,
  title: "新增用户",
  id: null,
})
// 打开弹框
const openDialog = async (row: any) => {
  dialogData.isShow = true;
  dialogData.title = '新增用户';
  if (row?.id) {
    dialogData.id = row.id;
    dialogData.title = '编辑用户';
    getDetails(row.id);
  }
}
// 关闭弹框
const closeDialog = () => {
  dialogData.isShow = false;
  dialogData.id = null;
  form.value = {
    gender: 1,
    status: true
  };
}
// 提交
const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      let data = form.value;
      if (data.id) {
        updateSysUser({...data}).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      } else {
        data.password = md5(data.password)
        addSysUser({...data}).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      }
    }
  })

}

/** 重置密码*/
const pswFormRef = ref()
let pswData = reactive({
  isShow: false,
  row: {},
  password: ''
})
// 效验规则
const pswRules = reactive<FormRules>({
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 12, message: '密码长度应为6到12位', trigger: 'blur'}
  ],
})
// 打开授权弹框
const openPswDialog = (row: any) => {
  if (row?.id) {
    pswData.row = row;
    pswData.isShow = true;
  }
}
// 关闭授权弹框
const closePswDialog = () => {
  pswData.isShow = false;
  pswData.row = {};
  pswData.password = '';
}
// 提交
const resetPsw = async () => {
  if (!pswFormRef.value) return;
  await pswFormRef.value.validate((valid) => {
    if (valid) {
      let params = {
        userId: pswData.row.id,
        password: md5(pswData.password)
      }
      resetSysUserPassword(params).then(() => {
        ElMessage.success('重置成功');
        closePswDialog();
      })
    }
  })
}

getDeptList();
getRoleList();
getTableList();
</script>
<style></style>
