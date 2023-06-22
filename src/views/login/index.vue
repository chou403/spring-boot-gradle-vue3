<template>
  <div class="container">
    <div class="form">
      <div class="sys-name mb30"><i class="iconfont icon-logo_skype logo-txt"></i>SPRING BOOT</div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item class="mb25" prop="username">
          <el-input :prefix-icon="User" size="large" clearable v-model="ruleForm.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item class="mb25" prop="password">
          <el-input :prefix-icon="Lock" size="large" show-password clearable v-model="ruleForm.password"
                    placeholder="请输入密码"/>
        </el-form-item>
        <el-button size="large" type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useUserStoreHook} from "@/store/modules/user";
import {Lock, User} from "@element-plus/icons-vue"
import md5 from "js-md5"

const router = useRouter();

const ruleForm = reactive({
  username: 'admin',
  password: '123456'
})
const rules = reactive({
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  },],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },],
})
const login = () => {
  useUserStoreHook().login({
    username: ruleForm.username,
    password: md5(ruleForm.password)
  }).then(async () => {
    await router.push('/')
  })
}

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background: url("@/assets/login-bg.webp") no-repeat center/cover;

  .form {
    width: 400px;
    // padding: 40px;
    text-align: center;
    border-radius: 20px;

    .sys-name {
      font-weight: bold;
      font-size: 20px;
      color: var(--el-color-primary);
      white-space: nowrap;
      animation: logoAnimation .3s ease;

      .logo-txt {
        font-size: 30px;
      }
    }
  }
}

@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

:deep() {
  .el-button {
    width: 100%;
    font-size: 16px;
    height: 45px;
  }

  .el-input__inner {
    --el-input-inner-height: 45px;
    font-size: 16px;
  }

  .el-icon {
    font-size: 16px;
  }
}
</style>
