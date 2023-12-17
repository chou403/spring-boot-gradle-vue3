<template>
  <div class="menu-vertical-box">
    <el-scrollbar height="100%">
      <el-menu
          unique-opened
          :collapse="configure.isCollapse&&configure.layoutMode!==1"
          :mode="configure.layoutMode===1?'horizontal':'vertical'"
          class="el-menu-vertical"
          :default-active="defaultActive"
          @select="menuSelect"
      >
        <sidebar-item v-for="routes in menuList" :key="routes.path" :menu="routes"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from './item.vue'
import {useConfigStoreHook} from "@/store/modules/config";
import {useUserStoreHook} from "@/store/modules/user";

const router = useRouter();
const route = useRoute();

const {configure} = storeToRefs(useConfigStoreHook())
const {menuList} = storeToRefs(useUserStoreHook());

let defaultActive=ref('')

// 获取当前隐藏路由的父级不隐藏路由
const getParentRoute = ():string => {
  let matched=router.currentRoute.value.matched;
  for (let i = matched.length-1; i >=0; i--) {
    if(matched[i]?.meta.isShow)return matched[i].path
  }
  return '';
}
watch(
    () => route.fullPath,
    () => {
      if (route.name === 'Login') return;
      const meta = route.meta;
      if(!meta.isShow){
        defaultActive.value=getParentRoute()
      }else{
        defaultActive.value=router.currentRoute.value.path
      }
    },
    {
      immediate: true,
    },
);
// 选择菜单
const menuSelect = (path:string) => {
  router.push(path)
}

</script>

<style lang="scss" scoped>
.menu-vertical-box {
  flex: 1;
  height: calc(100vh - 50px);

  .el-menu-vertical {
    height: 100%;
  }
}
</style>
