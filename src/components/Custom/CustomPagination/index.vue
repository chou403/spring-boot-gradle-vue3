<template>
  <div class="pagination-box">
    <el-pagination
        v-model:current-page="paginationData.currentPage"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="[10, 20,50, 100]"
        background
        hide-on-single-page
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.total"
        @size-change="changeSize"
        @current-change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";

const props = withDefaults(defineProps<{
  currentPage: number,
  pageSize?: number,
  total: number
}>(), {
  pageSize: 10,
})
let paginationData = reactive({
  currentPage: computed({
    get: () => props.currentPage,
    set: (val: number) => {
      emits('update:currentPage', val)
    }
  }),
  pageSize: computed({
    get: () => props.pageSize,
    set: (val: number) => {
      emits('update:pageSize', val)
    }
  }),
})

// 每页条数
const changeSize = (page: number) => {
  paginationData.currentPage = 1;
  paginationData.pageSize = page;
  emits('changePage', 1)
}

// 翻页
const changePage = (page: number) => {
  paginationData.currentPage = page;
  emits('changePage', page)
}

const emits = defineEmits<{
  (event: 'changePage', name: number): void
  (event: 'update:pageSize', name: number): void
  (event: 'update:currentPage', name: number): void
}>()
</script>

<style lang="scss" scoped>
.pagination-box {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
</style>
