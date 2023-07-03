<template>
  <div v-if="dialogData.isShow">
    <el-dialog :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
      <el-form ref="formRef" :model="form" label-width="90px" :rules="rules">
        <el-row>
          <el-col>
            <el-form-item label="上级部门">
              <custom-cascader v-model:value="form.parentId" :options="deptList" placeholder="请选择上级部门"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入部门名称"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" type="number" placeholder="请输入排序"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="状态" prop="status">
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
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  addSysDept,
  getSysDept,
  getSysDeptTreeList,
  updateSysDept
} from "@/api/dept";
import {ElMessage, FormInstance, FormRules} from "element-plus";

const emits = defineEmits<{
  (event: 'refresh'): void
}>()

const formRef = ref<FormInstance>()

// 表单
let form: any = ref({
  status: 1
});
// 效验规则
const rules = reactive<FormRules>({
  name: [
    {required: true, message: '请输入部门名称', trigger: 'blur'},
  ],
  sort: [
    {required: true, message: '请输入排序', trigger: 'blur'},
  ],
})
// 部门信息
const deptList = ref([])
// 获取部门数据
const getDeptList = () => {
  return new Promise((resolve) => {
    getSysDeptTreeList({}).then(res => {
      deptList.value = res || [];
      resolve(deptList.value)
    })
  })
}
// 获取详情
const getDetails = (id: number | string) => {
  getSysDept(id).then(res => {
    form.value = Object.assign({}, form.value, res);
  })
}
// 弹框数据
const dialogData = reactive({
  isShow: false,
  title: "新增部门",
  id: null,
})
// 打开弹框
const openDialog = async (row?: any) => {
  dialogData.isShow = true;
  dialogData.title = '新增部门';
  await getDeptList();
  if (row?.id) {
    dialogData.id = row.id;
    dialogData.title = '编辑部门';
    getDetails(row.id);
  }
}
// 关闭弹框
const closeDialog = () => {
  dialogData.isShow = false;
  dialogData.id = null;
  form.value = {
    status: 1
  };
}
// 提交
const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      if (form.value.id) {
        updateSysDept(form.value).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          emits('refresh');
        })
      } else {
        addSysDept(form.value).then(() => {
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
