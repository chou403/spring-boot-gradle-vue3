<template>
  <el-tag :type="type" :color="color" :effect="effect">
    <slot></slot>
  </el-tag>
</template>

<script lang="ts" setup>
const types=["primary","success","info","warning","danger"]

const props = withDefaults(defineProps<{
  type:string
}>(), {
  type:''
})

let effect=ref('light');
const type=computed(()=>types.indexOf(props.type)>=0?props.type:'')

const color=computed(()=>{
  return types.indexOf(props.type)>=0?"":props.type;
})
</script>

<style scoped>

</style>
