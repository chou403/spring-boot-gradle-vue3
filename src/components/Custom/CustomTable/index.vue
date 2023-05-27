<template>
  <div class="">
    <div v-if="operations.addOptions.url" class="table-btn-box mb10">
      <el-button type="primary" @click="formData.isShow=true">
        <el-icon class="mr5">
          <FolderAdd/>
        </el-icon>
        新 增
      </el-button>
    </div>
    <el-table :data="props.data" row-key="id" border style="width: 100%">
      <el-table-column v-for="item in props.columns" :key="item.name" :prop="item.name" :label="item.label"
                       align="center">
        <template v-if="item.tagConfig" #default="scope">
          <el-tag
              :type="item.tagConfig[scope.row[item.name]].color"
              disable-transitions
          >{{ item.tagConfig[scope.row[item.name]].text }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template #default="{row}">
          <el-button v-if="operations.editOptions.url" link type="primary" @click="editTable(row)">
            <el-icon class="mr5">
              <EditPen/>
            </el-icon>
            修改
          </el-button>
          <el-button v-if="operations.delOptions.url" @click="delTable(row)" link type="danger">
            <el-icon class="mr5">
              <Delete/>
            </el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <custom-form v-if="formData.isShow" @close="closeFormDialog" :row="formData.row" :operations="props.operations"
                 @change="tableRefresh"/>
  </div>
</template>

<script lang="ts" setup>
import {columnsType, operationsType, optionsType} from "@/components/Custom/types";
import {http} from '@/utils/http'
import {reactive,onMounted} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const props = defineProps<{
  data: Array<any>,
  columns: Array<columnsType>,
  operations?: operationsType,
}>()


const emits = defineEmits<{
  (event: 'refresh'): void
}>()

const formData:any = reactive({
  isShow: false,
  row: null,
})

/** 关闭弹框*/
const closeFormDialog = () => {
  formData.isShow = false;
  formData.id = '';
}

/** 刷新表格*/
function tableRefresh() {
  emits('refresh')
}

/** 编辑*/
const editTable = (row: any) => {
  formData.row = row;
  formData.isShow = true;
}
/** 删除*/
const delTable = (row: any) => {
  if(props.operations?.delOptions){
    ElMessageBox.confirm(
        '是否确认删除本条数据？',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          http.post<any>(props.operations?.delOptions?.url + row.id).then(() => {
            ElMessage.success('删除成功');
            tableRefresh();
          })
        })
  }
}

</script>

<style lang="scss" scoped>

</style>
