<template>
  <div>
    <div class="header__box">
      <div class="header__left">
        <template v-if="configure.layoutMode!==1">
          <div class="switch__sidebar icon__button">
            <el-icon size="16" color="#606266" @click="useConfigStoreHook().toggleSidebar">
              <ele-expand v-if="configure.isCollapse"/>
              <ele-fold v-else/>
            </el-icon>
          </div>
          <div class="breadcrumb__box">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="route in getBreadcrumb()" :to="route.path">{{ route.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </template>
        <template v-else>
          <Logo/>
          <Sidebar/>
        </template>
      </div>
      <div class="header__right">
        <div class="header-bar">
          <div class="header-bar__item">
            <notify/>
          </div>
          <div class="header-bar__item">
            <theme-picker/>
          </div>
        </div>
        <div class="header-bar__user">
          <user/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ThemePicker from "./ThemePicker/index.vue"
import Notify from "./Notify/index.vue"
import User from "./User/index.vue"
import Sidebar from '@/layout/components/sidebar/index.vue'
import Logo from '@/layout/components/sidebar/logo.vue'
import {useConfigStoreHook} from "@/store/modules/config";


const {configure} = storeToRefs(useConfigStoreHook())
const route = useRoute();
// 获取面包屑路由
const getBreadcrumb = () => {
  let matched:any=route.matched.filter((item) => item.meta && item.meta.title&&item.path!=='/'&& item.meta.title!=='首页')
  matched.unshift({
    path:'/',
    meta:{title:'首页'}
  })
  return matched;
}
</script>

<style lang="scss" scoped>
.header__box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid var(--el-menu-border-color);

  .header__left {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    .switch__sidebar {
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .header__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
    height: 100%;

    .header-bar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;

      .header-bar__item {
        padding: 0 10px;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;

        &:hover {
          background: rgba(0, 0, 0, .04);
        }
      }
    }

    .header-bar__user {
      margin-left: 15px;
    }
  }
}
</style>
