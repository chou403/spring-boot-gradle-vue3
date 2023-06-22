<template>
  <layout-header v-if="configure.layoutMode===1"/>
  <div class="wrapper-box">
    <div v-if="configure.layoutMode!==1" class="layout-left" :class="{'hideSidebar':configure.isCollapse}">
      <Logo/>
      <Sidebar/>
    </div>
    <div class="layout-right">
      <layout-header v-if="configure.layoutMode!==1"/>
      <app-main/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from './components/sidebar/logo.vue'
import Sidebar from './components/sidebar/index.vue'
import LayoutHeader from './components/header/index.vue'
import AppMain from './components/appMain/index.vue'
import {storeToRefs} from 'pinia'
import {useConfigStoreHook} from "@/store/modules/config";

const {configure} = storeToRefs(useConfigStoreHook())

</script>

<style lang="scss">
.wrapper-box{
  width: 100%;
  height: inherit;
  display: flex;
  .layout-left{
    flex:0 0 220px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--el-menu-border-color);
    transition: width .3s ease;
    &.hideSidebar{
      flex:0 0 64px !important;
    }
  }
  .layout-right{
    flex:1;
    min-width: 800px;
  }
}
</style>
