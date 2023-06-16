<template>
  <el-radio-group v-model="data.value">
    <template v-if="custom">
      <el-radio v-for="item in data.options" :key="item[custom.valueName||defaultConfig.valueName]" :label="item[custom.valueName||defaultConfig.valueName]" border>
        {{ item[custom.labelName||defaultConfig.labelName] }}
      </el-radio>
    </template>
    <template v-else>
      <el-radio v-for="item in options" :key="item.id" :label="item.id" border>
        {{ item.name }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import {reactive, onMounted,computed} from 'vue'
import {http} from "@/utils/http";
import {customType} from "@/components/Custom/types";

type optionType = {
  url: string
  name: string
  id: string
}

const props = withDefaults(defineProps<{
  value: any,
  options?: NullType<Array<optionType>>,
  custom?: NullType<customType>,
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
