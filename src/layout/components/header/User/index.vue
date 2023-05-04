<template>
  <el-dropdown trigger="click">
        <span class="el-dropdown-content flex-center">
          <el-avatar :size="25" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
          <span class="el-dropdown-username">{{ userinfo.username }}</span>
          <el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import {useUserStoreHook} from "@/store/modules/user";

const userinfo = useUserStoreHook().getUserInfo;

// 退出登录
const logout = () => {
  useUserStoreHook().logout();
}
</script>

<style lang="scss" scoped>
.el-dropdown-username{
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
}
</style>
