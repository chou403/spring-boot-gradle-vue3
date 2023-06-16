<template>
  <CustomPage :columns="pageConfig.columns" :search="pageConfig.search" :operations="pageConfig.operations"/>
</template>

<script lang="ts" setup>
const pageConfig={
  columns:[
    {
      label:'用户名',
      name:'username',
    },
    {
      label:'性别',
      name:'gender',
    },
    {
      label:'盐值',
      name:'salt',
    },
    {
      label:'邮箱',
      name:'email',
    },
    {
      label:'手机号',
      name:'phone',
    },
  ],
  search:{
    configure:[
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
  },
  operations:{
    configure:[
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
      },
      {
        label: '密码',
        name: 'password',
        placeholder: '请输入密码',
        type: 'password'
      },
      {
        label: '手机号',
        name: 'phone',
        placeholder: '请输入手机号',
        type: 'input'
      },
      {
        label: '邮箱',
        name: 'email',
        placeholder: '请输入邮箱',
        type: 'input'
      },
      {
        label: '盐值',
        name: 'salt',
        placeholder: '请输入盐值',
        type: 'input'
      },
      {
        label: '部门',
        name: 'deptId',
        type: 'select',
        placeholder: '请选择部门',
        custom:{
          url:'/sysDept/getSysDeptList',
        },
      },
      {
        label: '性别',
        name: 'gender',
        type: 'radio',
        options: [
          {
            name: '男',
            id: 1,
          },
          {
            name: '女',
            id: 0,
          }
        ]
      },
      {
        label: '状态',
        name: 'status',
        type: 'radio',
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
    getOptions:{
      url:'/sysUser/getSysUserList'
    },
    delOptions:{
      url:'/sysUser/deleteSysUser/'
    },
    addOptions:{
      url:'/sysUser/addSysUser',
    },
    editOptions:{
      url:'/sysUser/updateSysUser',
    }
  }
}


</script>

<style lang="scss" scoped>

</style>
