<template>
  <div class="menu-vertical-box">
    <el-scrollbar height="100%">
      <el-menu
          unique-opened
          :collapse="configure.isCollapse&&configure.layoutMode!==1"
          :mode="configure.layoutMode===1?'horizontal':'vertical'"
          class="el-menu-vertical"
          @select="menuSelect"
      >
        <sidebar-item v-for="routes in menuList" :key="routes.path" :menu="routes"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from './item.vue'
import {storeToRefs} from 'pinia'
import {useConfigStoreHook} from "@/store/modules/config";
import {useUserStoreHook} from "@/store/modules/user";
import { useRouter } from "vue-router";

const router = useRouter();

const {configure} = storeToRefs(useConfigStoreHook())

const {menuList} = useUserStoreHook();
console.log(menuList);

// 选择菜单
const menuSelect = (path:string) => {
  router.push(path)
}

</script>

<style lang="scss" scoped>
.menu-vertical-box {
  height: 100%;
  flex: 1;

  .el-menu-vertical {
    height: 100%;
  }
}
</style>
