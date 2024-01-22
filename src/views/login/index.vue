<template>
  <div class="container">
    <div class="form">
      <div class="sys-name mb30 flex-center"><img class="logo-img mr5" src="@/assets/logo.png" alt="">vue+ts</div>
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
import {useUserStoreHook} from "@/store/modules/user";
import {Lock, User} from "@element-plus/icons-vue"
import md5 from "js-md5"
import {NextLoading} from "@/utils/loading"

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
    NextLoading.start();
    await router.push('/')
  })
}
// 页面加载时
onMounted(() => {
  NextLoading.done();
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .form {
    width: 400px;
    // padding: 40px;
    text-align: center;
    border-radius: 20px;

    .sys-name {
      font-weight: bold;
      font-size: 20px;
      white-space: nowrap;
      animation: logoAnimation .3s ease;

      .logo-img {
        width: 40px;
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
