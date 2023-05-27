<template>
  <template v-if="custom">
    <el-cascader v-model="data.value" :props="defaultConfig" :show-all-levels="false" :options="data.options" :placeholder="placeholder" @change="onChange" style="width: 100%"/>
  </template>
  <template v-else>
    <el-cascader v-model="data.value" :props="defaultConfig" :show-all-levels="false" :options="options" :placeholder="placeholder" @change="onChange" style="width: 100%"/>
  </template>
</template>

<script lang="ts" setup>
import {reactive, onMounted} from 'vue'
import {http} from "@/utils/http";
import {customType} from "@/components/Custom/types";
import {formatCascade} from "@/utils";


type optionType = {
  url: string
  name: string
  id: string
}

const props = withDefaults(defineProps<{
  value: any,
  options?: Array<optionType>|undefined,
  custom?: customType|undefined,
  placeholder?:string
}>(), {
  placeholder:'请选择'
})

const defaultConfig = {
  value: props.custom?.valueName||'id',
  label: props.custom?.labelName||'name',
  checkStrictly:true
}

const emits = defineEmits<{
  (event: 'update:value', name: any): void
}>()

const data: any = reactive({
  value: '',
  options: []
})

/** 通过接口获取option数据*/
function getOptions() {
  if(props.custom?.url){
    http.post<any>(props.custom.url, {
      pageIndex: 1,
      pageSize: 99999
    }).then((res) => {
      data.options = formatCascade(res.list)
    })
  }
}


const onChange = (val: any) => {
  emits('update:value', val.length==1?val[0]:val);
}

onMounted(()=>{
  getOptions();
  data.value=Array.isArray(props.value)?props.value:[props.value];
  console.log(data)
})
</script>

<style lang="scss" scoped>

</style>
