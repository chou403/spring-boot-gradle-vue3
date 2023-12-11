<template>
  <div>
    <el-card shadow="never">
      <!--    查询-->
      <custom-search :configure="searchConfig" @search="search"></custom-search>
      <!--       新增-->
      <el-button type="primary" @click="openDialog" class="mb10">
        <el-icon class="mr5">
          <ele-circle-plus/>
        </el-icon>
        新 增
      </el-button>
      <!--      表格-->
      <custom-table ref="tableRef" :columns="columns" :config="tableConfig">
        <template #status="{row}">
          <el-tag v-if="row.status" type="success" disable-transitions>启用</el-tag>
          <el-tag v-else type="danger" disable-transitions>禁用</el-tag>
        </template>
        <template #isSystem="{row}">
          <el-tag v-if="row.isSystem" disable-transitions>系统类型</el-tag>
          <el-tag v-else type="info" disable-transitions>其他类型</el-tag>
        </template>
        <template #operation="{ row }">
          <el-button link type="primary" @click="openDialog(row)">
            修改
          </el-button>
          <el-button @click="delTableData(row)" link type="danger">
            删除
          </el-button>
        </template>
      </custom-table>
    </el-card>

    <!--    字典列表：添加，编辑弹框-->
    <Dialog ref="dialogRef" @refresh="refreshTable"/>
  </div>
</template>
<script lang="ts" setup>
import Dialog from "./components/dialog.vue";
import {deleteSysConfigApi, getSysConfigPageApi} from "@/api/configuration";
import {delTable} from "@/utils/table";

/**
 * @description查询
 * */
// 搜索栏配置
const searchConfig = [
  {
    label: '搜索',
    prop: 'keyword',
    placeholder: '请输入配置名称/配置key/配置值',
  },
  {
    label: '类型',
    prop: 'isSystem',
    type: 'select',
    placeholder: '请选择类型',
    options: [
      {
        name: '系统类型',
        id: 1,
      },
      {
        name: '其他类型',
        id: 0,
      },
    ],
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      {
        name: '启用',
        id: 1,
      },
      {
        name: '禁用',
        id: 0,
      },
    ],
  },
]

// 查询
function search(data) {
  if (tableRef.value) tableRef.value.search(data);
}

/**
 * @description表格
 * */
const tableRef = ref();
const dialogRef = ref();
// 表格列信息
const columns = [
  {
    prop: 'configName',
    label: '配置名称',
  },
  {
    prop: 'configKey',
    label: '配置key',
  },
  {
    prop: 'configValue',
    label: '配置值',
  },
  {
    prop: 'isSystem',
    label: '配置类型',
    isCustom: true,
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    prop: 'status',
    label: '状态',
    isCustom: true,
  },
  {
    prop: 'createTime',
    label: '创建时间',
    isSort: true,
  },
  {
    prop: 'operation',
    label: '操作',
    isCustom: true,
    fixed: 'right',
    width: 120
  },
]

// 表格配置信息
const tableConfig = reactive({
  initParam: {},
  searchParam: {},
  request: getSysConfigPageApi
})

// 打开表格操作弹框
function openDialog(data = {}) {
  dialogRef.value.openDialog(data);
}

// 删除列表数据
function delTableData(row: any) {
  delTable({
    id: row.id,
    request: deleteSysConfigApi,
    callback: () => {
      refreshTable();
    }
  })
}

// 刷新表格数据
function refreshTable() {
  if (tableRef.value) tableRef.value.getTableData();
}

</script>
<style lang="scss" scoped>
.dict-type-list {
  height: calc(100vh - 230px);
  overflow-y: auto;

  .dict-type-item {
    cursor: pointer;
    padding: 0 10px;
    height: 30px;
    position: relative;

    &.selected {
      background-color: #eaeefe;
    }

    &:hover {
      background-color: #f5f7fa;

      .dict-type-operation {
        display: flex;
        align-items: center;
      }
    }

    .dict-type-operation {
      position: absolute;
      right: 10px;
      top: 0;
      z-index: 10;
      height: 100%;
      background-color: #f5f7fa;
      display: none;
    }
  }
}
</style>
