<template>
  <div v-if="isShow">
    <el-dialog width="500px" :model-value="true" destroy-on-close :title="title" @close="closeDialog">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
        <el-row>
          <el-col>
            <el-form-item label="配置类型">
              <el-radio-group v-model="form.isSystem">
                <el-radio :label="true" border>系统类型</el-radio>
                <el-radio :label="false" border>其他类型</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="类型名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入类型名称"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="类型编码" prop="code">
              <el-input v-model="form.code" :disabled="!!id" placeholder="请输入类型编码"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {getSysDictTypeApi,addSysDictTypeApi,updateSysDictTypeApi} from "@/api/dict";
import {ElMessage, FormInstance} from "element-plus";
import useDialog from "@/hooks/useDialog";

const formRef = ref<FormInstance>()

const emits = defineEmits<{
  (event: 'refresh'): void
}>()

const {title,id,isShow,form,openDialog,closeDialog} =useDialog({
  initFormParam:{
    isSystem:true
  },
  getDetailsApi:getSysDictTypeApi
})

// 效验规则
const rules = {
  name: [
    {required: true, message: '请输入类型名称'},
  ],
  code: [
    {required: true, message: '请输入类型编码'},
  ],
}

// 提交
const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      if (id.value) {
        updateSysDictTypeApi(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          emits('refresh');
        })
      } else {
        addSysDictTypeApi(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          emits('refresh');
        })
      }
    }
  })
}

onMounted(()=>{

})

defineExpose({
  openDialog,
});
</script>

<style scoped>

</style>
