<template>
  <el-sub-menu v-if="props.menu?.children&&props.menu.name" :index="props.menu.path">
    <template #title>
       <div class="menu-icon">
         <component :is="props.menu.meta.icon" :inline-tamplate="true"/>
       </div>
       <span class="menu-txt">{{ props.menu.meta.title }}</span>
    </template>
    <template v-for="child in props.menu?.children">
      <el-menu-item
          v-if="!child?.children"
          :key="child.path"
          :index="child.path"
      >
          <component :is="child.meta.icon" :inline-tamplate="true"/>
          <span class="menu-txt">{{ child.meta.title }}</span>
      </el-menu-item>
      <sidebar-item
          v-else
          v-for="menu in child?.children" :key="menu.path" :menu="menu"></sidebar-item>
    </template>
  </el-sub-menu>
  <template v-else>
    <el-menu-item :index="props.menu.path" @click="">
        <div class="menu-icon">
          <component :is="props.menu.meta.icon" :inline-tamplate="true"/>
        </div>
        <span class="menu-txt">{{ props.menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import {childrenType} from "@/layout/types";
import {PropType} from "vue";
import SidebarItem from './item.vue'

const props = defineProps({
  menu: {
    type: Object as PropType<childrenType>
  },
});

</script>

<style scoped>
.menu-txt {
  margin-left: 10px;
}
.menu-icon{
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
