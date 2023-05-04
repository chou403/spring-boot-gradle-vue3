<template>
  <el-card shadow="never">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column v-for="item in options" :key="item.prop" :prop="item.prop" :label="item.label" align="center"/>
    </el-table>
    <div class="pagination-box">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 8, 10]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import {getSysUserListApi} from "@/api/system";
import {ref} from "vue";
import {GetSysUserListResult} from "@/api/types/systemTypes";


const pageSize = ref(10)
const currentPage  = ref(1)
const options=[
  {
    label:'用户名',
    prop:'username',
  },
  {
    label:'性别',
    prop:'gender',
  },
  {
    label:'邮箱',
    prop:'email',
  },
  {
    label:'手机号',
    prop:'phone',
  },
]

const tableData:GetSysUserListResult = ref([])

function getSysUserList() {
  getSysUserListApi({pageIndex:1}).then(res=>{
    tableData.value=res.list;
  })
}
getSysUserList();

</script>

<style lang="scss" scoped>
.pagination-box{
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
}
</style>
