<template>
  <el-sub-menu v-if="props.menu?.children&&props.menu.name" :index="props.menu.path">
    <template #title>
      <div class="menu-icon">
        <template  v-if="props.menu.meta.icon.startsWith('local')">
          <SvgIcon :name="props.menu.meta.icon"/>
        </template>
        <component v-else :is="props.menu.meta.icon" :inline-tamplate="true"/>
      </div>
      <span class="menu-txt">{{ props.menu.meta.title }}</span>
    </template>
    <template v-for="child in props.menu?.children">
      <el-menu-item
          v-if="!child?.children"
          :key="child.path"
          :index="child.path"
      >
        <div class="menu-icon">
          <template v-if="child.meta.icon.startsWith('local')">
            <SvgIcon :name="child.meta.icon"/>
          </template>
          <component v-else :is="child.meta.icon" :inline-tamplate="true"/>
        </div>
        <span class="menu-txt">{{ child.meta.title }}</span>
      </el-menu-item>
      <sidebar-item v-else :menu="child"></sidebar-item>
    </template>
  </el-sub-menu>
  <template v-else>
    <el-menu-item :index="props.menu.path" @click="">
      <div class="menu-icon">
        <template  v-if="props.menu.meta.icon.startsWith('local')">
          <SvgIcon :name="props.menu.meta.icon"/>
        </template>
        <component v-else :is="props.menu.meta.icon" :inline-tamplate="true"/>
      </div>
      <span class="menu-txt">{{ props.menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import {childrenType} from "@/layout/types";
import {PropType} from "vue";
import SidebarItem from './item.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

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
  &.is-active{
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
