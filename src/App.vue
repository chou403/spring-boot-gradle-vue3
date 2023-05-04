<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import {computed,onMounted} from "vue";
import {useGlobeConfigure} from "@/layout/hook/useGlobe";

const {setGlobeConfigure,getTranslation} =useGlobeConfigure();

const currentLocale=computed(getTranslation);

setGlobeConfigure();


onMounted(()=>{
  let loading = document.getElementById('loading')
  if(loading){
    setTimeout(()=>{
      document.body.removeChild(<HTMLElement>loading)
    },2000)
  }
})
</script>
