<template>
  <el-cascader v-model="data.value" clearable :props="defaultConfig" :show-all-levels="false"
               :options="options||data.options"
               :placeholder="placeholder" style="width: 100%"/>
</template>

<script lang="ts" setup>
import {http} from "@/utils/http";
import {getCascadeParent} from "@/utils";


type optionType = {
  name: string
  id: string
  children?: Array<optionType>
}
type configType = {
  valueName: string
  labelName: string
}

const props = withDefaults(defineProps<{
  value: any,
  options?: Array<optionType> | undefined,
  config?: configType
  placeholder?: string
  url?: string
}>(), {
  placeholder: '请选择'
})
const defaultConfig = {
  value: props.config?.valueName || 'id',
  label: props.config?.labelName || 'name',
  checkStrictly: true
}

const emits = defineEmits<{
  (event: 'update:value', name: any): void
}>()

const data: any = reactive({
  value: computed({
    get: () => {
      return getCascadeParent(data.options.length > 0 ? data.options : props.options, props.value)
    },
    set: val => {
      emits('update:value', val?.length > 0 ? val[val.length - 1] : val || 0);
    }
  }),
  options: []
})

/** 通过接口获取option数据*/
function getOptions() {
  if (props?.url) {
    http.post<any>(props.url, {}).then((res) => {
      data.options = res
    })
  }
}

onMounted(() => {
  getOptions();
})
</script>

<style lang="scss" scoped>

</style>
