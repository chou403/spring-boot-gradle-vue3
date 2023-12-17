<template>
  <el-sub-menu v-if="menu?.children" :index="menu.path">
    <template #title>
      <div class="menu-icon">
        <template v-if="menu.meta?.icon&&menu.meta.icon.startsWith('local')">
          <SvgIcon :name="menu.meta.icon"/>
        </template>
        <component v-else :is="menu.meta.icon" :inline-tamplate="true"/>
      </div>
      <span class="menu-txt">{{ menu.meta.title }}</span>
    </template>
    <template v-for="child in menu?.children">
        <el-menu-item
            v-if="!child?.children&&child.meta.isShow"
            :key="child.path"
            :index="child.path"
        >
          <div class="menu-icon">
            <template v-if="child.meta?.icon&&child.meta?.icon.startsWith('local')">
              <SvgIcon :name="child.meta.icon"/>
            </template>
            <component v-else :is="child.meta?.icon" :inline-tamplate="true"/>
          </div>
          <span v-if="child.meta.isLink" @click.prevent.stop="openLink(child.meta.linkUrl)" class="menu-txt w100">{{
              child.meta.title
            }}</span>
          <span v-else class="menu-txt">{{ child.meta.title }}</span>
        </el-menu-item>
        <sidebar-item v-else :menu="child"></sidebar-item>
    </template>
  </el-sub-menu>
  <template v-else-if="menu.meta.isShow">
    <el-menu-item :index="menu.path">
      <div class="menu-icon">
        <template v-if="menu.meta?.icon&&menu.meta?.icon.startsWith('local')">
          <SvgIcon :name="menu.meta.icon"/>
        </template>
        <component v-else :is="menu.meta?.icon" :inline-tamplate="true"/>
      </div>
      <span v-if="menu.meta.isLink" @click.prevent.stop="openLink(menu.meta.linkUrl)"
            class="menu-txt w100">{{ menu.meta.title }}</span>
      <span v-else class="menu-txt">{{ menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import {childrenType} from "@/layout/types";
import SidebarItem from './item.vue'
import {openLink} from "@/utils";

const props = defineProps({
  menu: {
    type: Object as PropType<childrenType>
  },
});

</script>

<style scoped lang="scss">
.menu-txt {
  margin-left: 10px;
  z-index: 1;
}

.menu-icon {
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.el-menu-item {
  &.is-active {
    color: #fff !important;

    &:before {
      background: var(--el-color-primary) !important;
      border-radius: 3px;
      clear: both;
      content: "";
      inset: 0 8px;
      margin: 4px 0;
      position: absolute;
    }
  }
}
</style>
