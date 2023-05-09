<template>
  <el-select v-model="data.value" :placeholder="placeholder" @change="onChange" style="width: 100%">
    <template v-if="props.custom">
      <el-option v-for="item in data.options" :key="item[custom.valueName||defaultConfig.valueName]" :label="item[custom.labelName||defaultConfig.labelName]"
                 :value="item[custom.valueName||defaultConfig.valueName]"/>
    </template>
    <template v-else>
      <el-option v-for="item in props.options" :key="item.id" :label="item.name" :value="item.id"/>
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import {reactive, onMounted} from 'vue'
import {http} from "@/utils/http";

type customType = {
  /** 接口地址*/
  url: string
  /** option的label属性名称,默认：name*/
  labelName?: string
  /** option的value属性名称,默认：id*/
  valueName?: string
}

type optionType = {
  url: string
  name: string
  id: string
}

const props = withDefaults(defineProps<{
  value: any,
  placeholder?: string,
  options?: Array<optionType>|undefined,
  custom?: Record<any, customType>|undefined,
}>(), {
  placeholder:'请选择'
})

const defaultConfig = {
  labelName: 'name',
  valueName: 'id'
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
  if (!props?.custom || !props.custom.url) return;
  http.post<any>(props?.custom?.url, {
    pageIndex: 1,
    pageSize: 99999
  }).then((res) => {
    data.options = res.list
  })
}


const onChange = (val: any) => {
  emits('update:value', val);
}

onMounted(()=>{
  getOptions();
  data.value=props.value;
})
</script>

<style lang="scss" scoped>

</style>
