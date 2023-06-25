<template>
  <div>
    <el-dropdown trigger="click">
    <span class="el-dropdown-content flex-center">
      <el-avatar :size="25" :src="userinfo.head||'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"/>
      <span class="el-dropdown-username">{{ userinfo.username }}</span>
      <el-icon class="el-icon--right"><ele-arrow-down/></el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="openUserInfoDrawer">个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-drawer
        v-model="drawerData.isShow"
        destroy-on-close
        append-to-body
        title="个人信息"
        @closed="closeUserInfoDrawer"
    >
      <el-tabs v-model="drawerData.activeName">
        <el-tab-pane label="基本信息" name="user">
          <UserInfo ref="userRef"/>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="password">
          <Password ref="pswRef"/>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import {useUserStoreHook} from "@/store/modules/user";
import Password from "./password.vue"
import UserInfo from "./userinfo.vue"

const userRef = ref()
const pswRef = ref()

const userinfo = storeToRefs(useUserStoreHook()).getUserInfo;


const drawerData = reactive({
  isShow: false,
  activeName: "user",
})

// 打开个人侧边栏
const openUserInfoDrawer = () => {
  drawerData.isShow = true;
}
// 关闭个人侧边栏
const closeUserInfoDrawer = () => {
  if(userRef.value)userRef.value.resetForm();
  if(pswRef.value)pswRef.value.resetForm();
  drawerData.activeName="user";
}

// 退出登录
const logout = () => {
  useUserStoreHook().logout();
}
</script>

<style lang="scss" scoped>
.user-box {
  padding: 20px 10px;
}

.el-dropdown-username {
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
}
</style>
