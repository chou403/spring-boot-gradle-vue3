<template>
  <div v-if="isShow">
    <el-dialog width="500px" :model-value="true" destroy-on-close :title="title" @close="closeDialog">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
        <el-row>
          <el-col>
            <el-form-item label="字典类型">
              <el-select v-model="form.dictCode" disabled>
                <el-option v-for="item in typeList" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字典名称" prop="label">
              <el-input v-model="form.label" placeholder="请输入字典名称"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字典值" prop="value">
              <el-input v-model="form.value" placeholder="请输入字典值"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序">
              <el-input v-model="form.sort" type="number" placeholder="请输入排序"/>
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
import {getSysDictApi,addSysDictApi,updateSysDictApi} from "@/api/dict";
import {ElMessage, FormInstance} from "element-plus";
import useDialog from "@/hooks/useDialog";

const formRef = ref<FormInstance>()

const props = defineProps<{
  typeList: any[],
  dictCode:string
}>()

const emits = defineEmits<{
  (event: 'refresh'): void
}>()

const {title,id,isShow,form,openDialog,closeDialog} =useDialog({
  initFormParam:{
    status:true,
    dictCode:computed(()=>props.dictCode)
  },
  getDetailsApi:getSysDictApi
})

// 效验规则
const rules = {
  label: [
    {required: true, message: '请输入字典名称',trigger: 'blur'},
  ],
  value: [
    {required: true, message: '请输入字典值',trigger: 'blur'},
  ],
}

// 提交
const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      if (id.value) {
        updateSysDictApi(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          emits('refresh');
        })
      } else {
        addSysDictApi(form.value).then(() => {
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
