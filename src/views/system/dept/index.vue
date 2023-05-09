<template>
  <CustomPage :url="pageConfig.url" :columns="pageConfig.columns" :operations="pageConfig.operations"/>
</template>

<script lang="ts" setup>
const pageConfig=({
  url:"/sysDept/getSysDeptList",
  columns:[
    {
      label:'部门名称',
      name:'name',
    },
    {
      label:'状态',
      name:'status',
      tagConfig:{
        0:{
          color:'danger',
          text:'禁用'
        },
        1: {
          color:'success',
          text:'启用'
        },
      }
    },
    {
      label:'排序',
      name:'sort',
    },
  ],
  operations:{
    configure:[
      {
        label: '部门名称',
        name: 'name',
        placeholder: '请输入部门名称',
        span:24,
        type: 'input'
      },
      {
        label: '排序',
        name: 'sort',
        placeholder: '请输入排序',
        span:24,
        type: 'number'
      },
      {
        label: '状态',
        name: 'status',
        type: 'radio',
        span:24,
        options: [
          {
            name: '启用',
            id: 1,
          },
          {
            name: '禁用',
            id: 0,
          }
        ]
      },
    ],
    delOptions:{
      url:'/sysDept/deleteSysDept/'
    },
    addOptions:{
      url:'/sysDept/addSysDept',
    },
    editOptions:{
      url:'/sysDept/updateSysDept',
    }
  }
})


</script>

<style lang="scss" scoped>

</style>
