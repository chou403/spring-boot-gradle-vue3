<template>
  <div>
    <CustomPage :url="pageConfig.url" :columns="pageConfig.columns" :operations="pageConfig.operations">
      <template #operate="row">
        <el-button link type="primary" @click="openAuthDialog(row)">
          <el-icon class="mr5">
            <ele-key/>
          </el-icon>
          授权
        </el-button>
      </template>
    </CustomPage>

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
          <el-button @click="closeAuthDialog">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {getSysMenuListApi} from "@/api/system";
import {reactive, ref} from "vue";
import {formatCascade} from "@/utils";

const pageConfig = {
  columns: [
    {
      label: '角色名称',
      name: 'name',
    },
    {
      label: '角色标识',
      name: 'code',
    },
    {
      label: '状态',
      name: 'status',
      tagConfig: {
        false: {
          color: 'danger',
          text: '禁用'
        },
        true: {
          color: 'success',
          text: '启用'
        },
      }
    },
    {
      label: '创建时间',
      name: 'createTime',
    },
  ],
  operations: {
    configure: [
      {
        label: '角色名称',
        name: 'name',
        placeholder: '请输入角色名称',
        span: 24,
        type: 'input'
      },
      {
        label: '角色标识',
        name: 'code',
        placeholder: '请输入角色标识',
        span: 24,
        type: 'input'
      },
      {
        label: '状态',
        name: 'status',
        type: 'radio',
        span: 24,
        options: [
          {
            name: '启用',
            id: true,
          },
          {
            name: '禁用',
            id: false,
          }
        ]
      },
    ],
    getOptions: {
      url: '/sysRole/getSysRoleList',
    },
    delOptions: {
      url: '/sysRole/deleteSysRole/'
    },
    addOptions: {
      url: '/sysRole/addSysRole',
    },
    editOptions: {
      url: '/sysRole/updateSysRole',
    },
    detailOptions:{
      url:'/sysRole/getSysRole/'
    }
  }
}

const authRef=ref()
const props={
  label:'name',
}
let authData=reactive({
  isShow:false,
  data:[]
})
// 打开授权弹框
const openAuthDialog = () => {
  getSysMenuListApi({pageSize:99999}).then(res=>{
    authData.data=formatCascade(res.list||[]);
  })
  authData.isShow=true;
}
// 关闭授权弹框
const closeAuthDialog = () => {
  authData.isShow=false;
}
// 提交
const submit = () => {
  console.log(authRef.value.getCheckedKeys())
}
</script>

<style lang="scss" scoped>

</style>
