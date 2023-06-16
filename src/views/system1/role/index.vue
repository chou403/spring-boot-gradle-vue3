<template>
  <CustomPage :url="pageConfig.url" :columns="pageConfig.columns" :operations="pageConfig.operations"/>
</template>

<script lang="ts" setup>
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
    }
  }
}


</script>

<style lang="scss" scoped>

</style>
