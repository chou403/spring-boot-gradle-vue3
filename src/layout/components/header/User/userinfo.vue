<template>
  <el-form ref="formRef" :rules="rules" :model="userForm" label-width="90px">
    <el-row class="user-box">
      <el-col>
        <el-form-item prop="nickname">
          <Avatar v-model:value="userForm.head"/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userForm.nickname" placeholder="请输入昵称"/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号码"/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入电子邮件"/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="性别">
          <el-radio-group v-model="userForm.gender">
            <el-radio v-for="(item,key) in system_status.gender" :label="Number(key)" border>{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="角色">
          <el-input v-model="userForm.roleNames" disabled/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="部门">
          <el-input v-model="userForm.deptName" disabled/>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="登录日期">
          <el-input v-model="userForm.loginTime" disabled/>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <el-form-item>
          <el-button type="primary" @click="submitUserInfo">更新个人信息</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import {useUserStoreHook} from "@/store/modules/user";
import type {FormInstance, FormRules} from "element-plus";
import {validateEmail, validatePhoneNumber} from "@/utils/validate";
import {system_status} from "@/utils/status";
import {updateProfile} from "@/api/user";
import {ElMessage} from "element-plus";

const userinfo = storeToRefs(useUserStoreHook()).getUserInfo;
const formRef = ref<FormInstance>()


interface UserInfoType {
  head: string
  nickname: string
  phone: string
  email: string
  gender: NullType<number>
  roleNames: string[]
  deptName: NullType<string>
  loginTime:string
}

// 个人信息
const userForm = ref<UserInfoType>({
  head:'',
  nickname:'',
  phone:'',
  email:'',
  gender:null,
  roleNames:[],
  deptName:'',
  loginTime:'',
})
userForm.value={...userForm.value,...userinfo.value}
// 效验规则
const rules = reactive<FormRules>({
  nickname: [
    {required: true, message: '请输入昵称', trigger: 'blur'},
  ],
  phone: [
    {validator: validatePhoneNumber, trigger: 'blur'},
  ],
  email: [
    {validator: validateEmail, trigger: 'blur'},
  ],
})
// 更新个人信息
const submitUserInfo = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      updateProfile({
        id:userinfo.value.userId,
        nickname:userForm.value.nickname,
        phone:userForm.value.phone,
        email:userForm.value.email,
        gender:userForm.value.gender,
      }).then(()=>{
        ElMessage.success('修改成功');
      })
    }
  })
}
// 重置表单
const resetForm = () => {
  if(formRef.value)formRef.value.resetFields();
}
defineExpose({
  resetForm
})
</script>

<style scoped>

</style>
