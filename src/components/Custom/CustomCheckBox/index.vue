<template>
  <el-checkbox-group v-model="data.value">
    <template v-if="custom">
      <el-checkbox v-for="item in data.options" :key="item[custom.valueName||defaultConfig.valueName]" :label="item[custom.valueName||defaultConfig.valueName]" border>{{ item[custom.labelName||defaultConfig.labelName] }}</el-checkbox>
    </template>
    <template v-else>
      <el-checkbox v-for="item in options" :key="item.id" :label="item.id" border>{{ item.name }}</el-checkbox>
    </template>
  </el-checkbox-group>
  <el-radio-group>

  </el-radio-group>
</template>

<script lang="ts" setup>
import {reactive, onMounted, computed} from 'vue'
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
  options?: Array<optionType>|undefined,
  custom?: Record<any, customType>|undefined,
}>(), {
})

const defaultConfig = {
  labelName: 'name',
  valueName: 'id'
}

const emits = defineEmits<{
  (event: 'update:value', name: any): void
}>()

const data: any = reactive({
  value: computed({
    get:()=>props.value,
    set:val=>{
      emits('update:value', val);
    }
  }),
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

onMounted(()=>{
  getOptions();
})
</script>

<style lang="scss" scoped>

</style>
