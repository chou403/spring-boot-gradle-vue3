<template>
  <el-form ref="pswFormRef" :rules="pswRules" :model="pswData" label-width="90px">
    <el-row class="user-box">
      <el-col>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="pswData.oldPassword" type="password" placeholder="请输入旧密码"/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="pswData.password" type="password" placeholder="请输入新密码"/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="pswData.confirmPassword" type="password" placeholder="请输入确认密码"/>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <el-form-item>
          <el-button type="primary" @click="submitPsw">提交</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import type {FormInstance, FormRules} from "element-plus";
import {updatePassword} from "@/api/user";
import {ElMessage} from "element-plus";
import {useUserStoreHook} from "@/store/modules/user";
import md5 from "js-md5"

const userStore=useUserStoreHook();
const userinfo = storeToRefs(userStore).getUserInfo;
const pswFormRef = ref<FormInstance>()

interface PasswordType {
  oldPassword: string
  password: string
  confirmPassword: string
}

/** 修改密码*/
// 修改密码表单信息
let pswData = ref<PasswordType>({
  oldPassword: '',
  password: '',
  confirmPassword: '',
})
// 密码验证规则
const validatePass = (rule: any, value: any, callback: any) => {
  if (pswData.value.password && pswData.value.confirmPassword && pswData.value.password !== pswData.value.confirmPassword) {
    callback(new Error('两次密码输入不一致'))
  } else {
    callback()
  }
}
// 效验规则
const pswRules = reactive<FormRules>({
  oldPassword: [
    {required: true, message: '请输入旧密码', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    { min: 6, max: 20, message: '密码长度6到20位', trigger: 'blur' },
    {validator: validatePass, trigger: 'blur'},
  ],
  confirmPassword: [
    {required: true, message: '请输入确认密码', trigger: 'blur'},
    { min: 6, max: 20, message: '密码长度6到20位', trigger: 'blur' },
    {validator: validatePass, trigger: 'blur'},
  ],
})
// 重置表单
const resetForm = () => {
  if(pswFormRef.value)pswFormRef.value.resetFields();
}
// 修改密码
const submitPsw = async () => {
  if (!pswFormRef.value) return;
  await pswFormRef.value.validate((valid) => {
    if (valid) {
      updatePassword({
        id:userinfo.value.userId,
        oldPassword: md5(pswData.value.oldPassword),
        password: md5(pswData.value.password),
        confirmPassword: md5(pswData.value.confirmPassword),
      }).then(()=>{
        ElMessage.success('修改成功');
        userStore.logout();
      })
    }
  })
}

defineExpose({
  resetForm
})
</script>

<style scoped>

</style>
