<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="el-fade-in-linear" mode="out-in">
          <keep-alive v-if="route.meta.isCache">
            <component
                :is="Component"
                :key="route.fullPath"
                class="main-content"
            />
          </keep-alive>
          <component
              v-else
              :is="Component"
              :key="route.fullPath"
              class="main-content"
          />
        </transition>
      </template>
    </router-view>
  </section>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
  overflow-x: hidden;
  background-color: #f8f8f8;
  padding: 15px;
}
</style>
