<template>
  <div class="">
    <div v-if="operations?.addOptions?.url" class="table-btn-box mb10">
      <el-button type="primary" @click="openFormDialog">
        <el-icon class="mr5">
          <ele-folder-add/>
        </el-icon>
        新 增
      </el-button>
    </div>
    <el-table table-layout="auto" :data="props.data" row-key="id" border style="width: 100%">
      <el-table-column :width="item.width" v-for="item in props.columns" :key="item.name" :prop="item.name" :label="item.label"
                       align="center">
        <template v-if="item.tagConfig" #default="scope">
          <el-tag
              :type="item.tagConfig[scope.row[item.name]].color"
              disable-transitions
          >{{ item.tagConfig[scope.row[item.name]].text }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column v-if="operations?.editOptions?.url||operations?.delOptions?.url" label="操作" align="center" fixed="right">
        <template #default="{row}">
          <el-button v-if="operations?.editOptions?.url" link type="primary" @click="openFormDialog(row)">
            <el-icon class="mr5">
              <ele-edit-pen/>
            </el-icon>
            修改
          </el-button>
          <slot name="operate" :row="row"></slot>
          <el-button v-if="operations?.delOptions?.url" @click="delTable(row)" link type="danger">
            <el-icon class="mr5">
              <ele-delete/>
            </el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <slot name="form">
      <custom-form v-if="formData.isShow" @close="closeFormDialog" :row="formData.row" :operations="props.operations"
                   @change="tableRefresh"/>
    </slot>
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
  (event: 'open',data:any): void
  (event: 'close'): void
}>()

const formData:any = reactive({
  isShow: false,
  row: null,
})

/** 关闭弹框*/
const closeFormDialog = () => {
  formData.isShow = false;
  formData.row = {};
  formData.id = '';
  emits('close')
}

/** 刷新表格*/
function tableRefresh() {
  emits('refresh')
}

/** 打开弹框*/
const openFormDialog = (row?: any) => {
  if(row)formData.row = row;
  formData.isShow = true;
  emits('open',row)
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
        }).catch(()=>{})
  }
}

</script>

<style lang="scss" scoped>

</style>
