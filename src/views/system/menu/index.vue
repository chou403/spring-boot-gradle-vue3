<template>
  <CustomPage :url="pageConfig.url" :columns="pageConfig.columns" :operations="pageConfig.operations"/>
</template>

<script lang="ts" setup>

const pageConfig = {
  columns: [
    {
      label: '菜单名称',
      name: 'name',
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
      label: '权限标识',
      name: 'code',
    },
    {
      label: '图标',
      name: 'icon',
    },
    {
      label: '路径',
      name: 'routeUrl',
    },
    {
      label: '页面路径',
      name: 'componentPath',
    },
  ],
  operations: {
    configure: [
      {
        label: '上级菜单',
        name: 'parentId',
        placeholder: '请选择上级菜单',
        span: 24,
        type: 'cascade',
        custom: {
          url: '/sysMenu/getSysMenuList'
        }
      },
      {
        label: '类型',
        name: 'type',
        type: 'radio',
        options: [
          {
            name: '按钮',
            id: 1,
          },
          {
            name: '菜单',
            id: 0,
          }
        ]
      },
      {
        label: '菜单名称',
        name: 'name',
        placeholder: '请输入菜单名称',
        type: 'input'
      },
      {
        label: '权限标识',
        name: 'code',
        placeholder: '请输入权限标识',
        type: 'input'
      },
      {
        label: '图标',
        name: 'icon',
        placeholder: '请输入图标',
        type: 'input'
      },
      {
        label: '路由路径',
        name: 'routeUrl',
        placeholder: '请输入路由路径',
        type: 'input'
      },
      {
        label: '路由名称',
        name: 'routeName',
        placeholder: '请输入路由名称',
        type: 'input'
      },
      {
        label: '路由重定向',
        name: 'routeRedirect',
        placeholder: '请输入路由重定向',
        type: 'input'
      },
      {
        label: '页面路径',
        name: 'componentPath',
        placeholder: '请输入页面路径',
        type: 'input'
      },
      {
        label: '排序',
        name: 'sort',
        placeholder: '请输入排序',
        type: 'number'
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
      {
        label: '是否隐藏',
        name: 'isShow',
        type: 'radio',
        options: [
          {
            name: '是',
            id: true,
          },
          {
            name: '否',
            id: false,
          }
        ]
      },
      {
        label: '是否缓存',
        name: 'isCache',
        type: 'radio',
        options: [
          {
            name: '是',
            id: true,
          },
          {
            name: '否',
            id: false,
          }
        ]
      },
    ],
    getOptions: {
      url: '/sysMenu/getSysMenuList',
      type: 'tree',
      pageSize: 99999
    },
    delOptions: {
      url: '/sysMenu/deleteSysMenu/'
    },
    addOptions: {
      url: '/sysMenu/addSysMenu',
    },
    editOptions: {
      url: '/sysMenu/updateSysMenu',
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
