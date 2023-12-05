<template>
  <el-tabs
      v-model="activeKey"
      type="card"
      class="header-tabs"
      @tab-change="changePage"
      @tab-remove="removeTab"
  >
    <el-tab-pane
        v-for="item in tabsList"
        :key="item.name"
        :label="item.meta.title"
        :name="item.name"
        :closable="item.name!=='Home'"
    >
      <template #label>
        <el-dropdown trigger="contextmenu" placement="bottom-end">
          <div class="tabs-title">
            {{ item.meta.title }}
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Refresh" @click="reloadPage(item.name)">刷新</el-dropdown-item>
              <el-dropdown-item :icon="Back" @click="closeLeft(item)">关闭左侧</el-dropdown-item>
              <el-dropdown-item :icon="Right" @click="closeRight(item)">关闭右侧</el-dropdown-item>
              <el-dropdown-item :icon="Switch" @click="closeOther(item)">关闭其他</el-dropdown-item>
              <el-dropdown-item :icon="Close" @click="closeAll">全部关闭</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {blackList, useTabsStore} from "@/store/modules/tabs"
import type {RouteLocationNormalized} from "vue-router"
import {Right,Back, Close, Refresh,Switch} from '@element-plus/icons-vue'

const route = useRoute();
const router = useRouter();

const tabsStore = useTabsStore();

// 标签页列表
const tabsList = computed(() => tabsStore.getTabsList);

const activeKey = computed(() => tabsStore.getCurrentTab?.name);

// 获取简易的路由对象
const getSimpleRoute = (route: RouteLocationNormalized) => {
  const {fullPath, hash, meta, name, params, path, query} = route;
  return {fullPath, hash, meta, name, params, path, query};
};
let routes = tabsStore.tabsList || [getSimpleRoute(route)];
tabsStore.initTabs(routes);

watch(
    () => route.fullPath,
    () => {
      if (blackList.some((n) => n === route.name)) return;
      tabsStore.addTabs(getSimpleRoute(route));
    },
    {immediate: true},
);

// 目标路由是否等于当前路由
const isCurrentRoute = (name:string) => {
  return router.currentRoute.value.matched.some((item) => item.name === name);
};

// 切换页面
const changePage = (key: string) => {
  Object.is(route.name, key) || router.push({name: key});
};

// 关闭当前页面
const removeTab = (name:string) => {
  tabsStore.closeTab(name);
};

// 刷新页面
const reloadPage = (name:string) => {
  // 判断是否是当前页面
  if(isCurrentRoute(name)){
    router.go(0);
  }else{
    router.replace({
      name,
      params: {
        path: unref(route).fullPath,
      },
    });
  }
};

// 关闭左侧
const closeLeft = (route:RouteLocationNormalized) => {
  tabsStore.closeLeftTabs(route);
  !isCurrentRoute(route.name as string) && router.replace(route.fullPath);
};

// 关闭右侧
const closeRight = (route:RouteLocationNormalized) => {
  tabsStore.closeRightTabs(route);
  !isCurrentRoute(route.name as string) && router.replace(route.fullPath);
};

// 关闭其他
const closeOther = (route:RouteLocationNormalized) => {
  tabsStore.closeOtherTabs(route);
  !isCurrentRoute(route.name as string) && router.replace(route.fullPath);
};

// 关闭全部
const closeAll = () => {
  tabsStore.closeAllTabs();
  router.replace('/');
};
</script>
<style lang="scss">
.header-tabs {
  > .el-tabs__header {
    margin-bottom: 0;

    .el-tabs__nav {
      border: none;
    }
  }

  .el-tabs__item {
    margin: 5px 3px;
    border: 1px solid var(--el-border-color-light) !important;
    border-radius: 3px;
    height: 30px;
    font-size: 12px;

    &.is-active {
      .tabs-title {
        color: var(--el-color-primary);
      }
    }
    &:hover{
      .el-dropdown {
        color: var(--el-color-primary);
      }
    }
  }
}

</style>
