<template>
  <el-button type="primary" @click="login">登录</el-button>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import {useUserStoreHook} from "@/store/modules/user";

const router = useRouter();

const login = () => {
  useUserStoreHook().login({
    username:'admin',
    password:'123456'
  }).then(()=>{
    router.push('/')
  })
}

</script>

<style scoped lang="scss">

</style>
