<template>
  <div>
    <!--    表格-->
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" row-key="id" @sort-change="onSort">
      <template v-for="item in props.columns">
        <el-table-column :prop="item.prop" :sortable="item.isSort?'custom':false" :label="item.label" :min-width="item.minWidth" :width="item.width"
                         :fixed="item.fixed" :align="item.align||'center'">
          <template v-if="item.isCustom" #default="scope">
            <slot :name="item.prop" :row="scope.row" :column="scope.column" :index="scope.$index"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!--    分页-->
    <CustomPagination v-model:currentPage="pagination.pageIndex" v-model:pageSize="pagination.pageSize"
                      :total="pagination.total" @changePage="changePage"/>
  </div>
</template>

<script setup lang="ts">
import useTable from "@/components/Custom/CustomTable/useTable";
import {toSnakeCase} from "@/utils";

// 定义一个columnsType类型，用于描述表格列的属性
type columnsType = {
  // 属性名
  prop: string
  // 列名
  label: string
  // 宽度，可以是字符串或数字
  width?: string | number
  // 是否自定义
  isCustom?: boolean,
  // 固定位置，可以是'right'、'left'或'center'
  fixed?: 'right' | 'left' | 'center'
  // 对齐方式，可以是'center'、'left'或'right'
  align?: 'center' | 'left' | 'right',
  // 最小宽度，可以是字符串或数字
  minWidth?: string | number
  //排序
  isSort?:boolean
}

// 定义一个tableConfig类型，用于配置表格
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
const {tableData, pagination,search, loading, changePage, getTableData,sortChange} = useTable({
  // 请求函数，参数为任意类型，返回值为Promise类型
  request: props.config.request,
  // 初始化参数，默认为空对象
  initParam: props.config?.initParam||{},
  // 是否立即执行
  immediate:  props.config.immediate
})

// 排序
function onSort({prop, order}:Record<string, string>) {
  sortChange({
    orderByColumn:toSnakeCase(prop),
    orderByAsc:order === "ascending"
  });
}

// 定义一个接口，用于暴露表格数据和搜索参数
defineExpose({
  getTableData,
  search
})

</script>

<style scoped>

</style>
