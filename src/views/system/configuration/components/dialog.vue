<template>
  <div v-if="isShow">
    <el-dialog width="500px" :model-value="true" destroy-on-close :title="title" @close="closeDialog">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
        <el-row>
          <el-col>
            <el-form-item label="类型">
              <el-radio-group v-model="form.isSystem">
                <el-radio :label="true" border>系统类型</el-radio>
                <el-radio :label="false" border>其他类型</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="配置名称" prop="configName">
              <el-input v-model="form.configName" placeholder="请输入配置名称"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="配置key" prop="configKey">
              <el-input v-model="form.configKey" placeholder="请输入配置key"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="配置值" prop="configValue">
              <el-input v-model="form.configValue" placeholder="请输入配置值"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio :label="true" border>启用</el-radio>
                <el-radio :label="false" border>禁用</el-radio>
              </el-radio-group>
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
import {getSysConfigApi,addSysConfigApi,updateSysConfigApi} from "@/api/configuration";
import {ElMessage, FormInstance} from "element-plus";
import useDialog from "@/hooks/useDialog";

const formRef = ref<FormInstance>()

const emits = defineEmits<{
  (event: 'refresh'): void
}>()

const {title,id,isShow,form,openDialog,closeDialog} =useDialog({
  initFormParam:{
    status:true,
    isSystem:true
  },
  getDetailsApi:getSysConfigApi
})

// 效验规则
const rules = {
  configName: [
    {required: true, message: '请输入配置名称'},
  ],
  configKey: [
    {required: true, message: '请输入配置key'},
  ],
  configValue: [
    {required: true, message: '请输入配置值'},
  ],
}

// 提交
const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      if (id.value) {
        updateSysConfigApi(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          emits('refresh');
        })
      } else {
        addSysConfigApi(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          emits('refresh');
        })
      }
    }
  })

}

defineExpose({
  openDialog,
});
</script>

<style scoped>

</style>
