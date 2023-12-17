<template>
  <div>
    <!--    表格-->
    <el-table :data="data" border style="width: 100%" row-key="id" @sort-change="onSort">
      <template v-for="item in props.columns">
        <el-table-column :prop="item.prop" :sortable="item.isSort?'custom':false" :label="item.label" :min-width="item.minWidth" :width="item.width"
                         :fixed="item.fixed" :align="item.align||'center'">
          <template v-if="item.isCustom" #default="scope">
            <slot :name="item.prop" :row="scope.row" :column="scope.column" :index="scope.$index"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

  </div>
</template>

<script setup lang="ts">
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

// 定义props，用于接收配置和列的参数
const props = defineProps<{
  data:any[],
  columns: columnsType[]
}>()

const emits=defineEmits(['onSort'])


// 排序
function onSort({prop, order}:Record<string, string>) {
  emits('onSort', {prop, order})
}


</script>

<style scoped>

</style>
