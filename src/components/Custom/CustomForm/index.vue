<template>
  <el-dialog :model-value="true" :title="form.id?'修改':'新增'">
    <el-form :model="form" label-width="90px">
      <el-row>
        <template v-for="(item,index) in props.operations.configure" :key="index">
          <el-col v-if="!item.type||item.type==='input'" :span="item?.span||12">
            <el-form-item :label="item.label">
              <el-input v-model="form[item.name]" :placeholder="item.placeholder"/>
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.type==='number'" :span="item?.span||12">
            <el-form-item :label="item.label">
              <el-input v-model="form[item.name]" type="number" :placeholder="item.placeholder"/>
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.type==='password'" :span="item?.span||12">
            <el-form-item :label="item.label">
              <el-input v-model="form[item.name]" type="password" :placeholder="item.placeholder"/>
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.type==='textarea'" :span="item?.span||12">
            <el-form-item :label="item.label">
              <el-input v-model="form[item.name]" autosize :rows="3" type="textarea" :placeholder="item.placeholder"/>
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.type==='radio'" :span="item?.span||12">
            <el-form-item :label="item.label">
              <custom-radio v-model:value="form[item.name]" :options="item.options" :custom="item.custom"/>
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.type==='checkBox'" :span="item?.span||12">
            <el-form-item :label="item.label">
              <custom-check-box v-model:value="form[item.name]" :options="item.options" :custom="item.custom"/>
            </el-form-item>
          </el-col>
          <el-col v-else-if="item.type==='select'" :span="item?.span||12">
            <el-form-item :label="item.label">
              <custom-select v-model:value="form[item.name]" :placeholder="item.placeholder" :options="item.options"
                             :custom="item.custom"/>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {http} from "@/utils/http";
import {ElMessage} from "element-plus";

const props = defineProps<{
  operations: any,
  row?: any
}>()


const emits = defineEmits<{
  (event: 'close'): void
  (event: 'change'): void
}>()

let form: any = ref({})

/** 提交*/
const submit = () => {
  if(form.value.id){
    http.post<any>(props.operations.editOptions.url, {
      ...form.value
    }).then(() => {
      ElMessage.success('操作成功');
      emits('change')
      closeDialog();
    })
  }else{
    http.post<any>(props.operations.addOptions.url, {
      ...form.value
    }).then(() => {
      ElMessage.success('操作成功');
      emits('change')
      closeDialog();
    })
  }
}

/** 关闭弹框*/
const closeDialog = () => {
  emits('close')
}

onMounted(() => {
  if (props.row) {
    form.value = Object.assign({}, form.value, props.row);
  }
})

</script>

<style lang="scss" scoped>

</style>
