<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import {useGlobeConfigure} from "@/layout/hook/useGlobe";

const {setGlobeConfigure,getTranslation} =useGlobeConfigure();

const currentLocale=computed(getTranslation);

setGlobeConfigure();

</script>
