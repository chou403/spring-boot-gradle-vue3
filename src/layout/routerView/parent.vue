<template>
	<div class="layout-parent">
		<router-view v-slot="{ Component,route }">
			<transition name="el-fade-in-linear" mode="out-in">
				<keep-alive v-if="route.meta.isCache">
					<component :is="Component" :key="route.fullPath"/>
				</keep-alive>
        <component v-else :is="Component" :key="route.fullPath"/>
			</transition>
		</router-view>
	</div>
</template>

<script setup lang="ts">
// 页面加载时
import {NextLoading} from "@/utils/loading";

onMounted(() => {
  NextLoading.done(600);
});
</script>
<style lang="scss" scoped>
.layout-parent{
  width: 100%;
  min-height: 100%;
  overflow-y: auto;
}
</style>
