<template>
  <el-cascader v-model="data.value" clearable :props="defaultConfig" :show-all-levels="false"
               :options="custom?data.options:options"
               :placeholder="placeholder" style="width: 100%"/>
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive} from 'vue'
import {http} from "@/utils/http";
import {customType} from "@/components/Custom/types";
import {formatCascade, getCascadeParent} from "@/utils";


type optionType = {
  url: string
  name: string
  id: string
}

const props = withDefaults(defineProps<{
  value: any,
  options?: Array<optionType> | undefined,
  custom?: customType | undefined,
  placeholder?: string
}>(), {
  placeholder: '请选择'
})

const defaultConfig = {
  value: props.custom?.valueName || 'id',
  label: props.custom?.labelName || 'name',
  checkStrictly: true
}

const emits = defineEmits<{
  (event: 'update:value', name: any): void
}>()

const data: any = reactive({
  value: computed({
    // get: () => Array.isArray(props.value) ? props.value : [props.value],
    get: () => getCascadeParent(data.options,props.value),
    set: val => {
      emits('update:value', val?.length > 0 ? val[val.length - 1] : val||0);
    }
  }),
  options: []
})

/** 通过接口获取option数据*/
function getOptions() {
  if (props.custom?.url) {
    http.post<any>(props.custom.url, {
      pageIndex: 1,
      pageSize: 99999
    }).then((res) => {
      data.options = formatCascade(res.list)
    })
  }
}

// const obj = {"id":"01","children":[{"id":"02","children":[{"id":"03","children":[]},{"id":"04","children":[{"id":"05","children":[]}]}]},{"id":"06","children":[{"id":"07","children":[]},{"id":"08","children":[{"id":"09","children":[]}]}]}]};
//
// const f = (obj, id) => [obj.id,
//   ...obj.children.map(c=>f(c,id)).find(i=>i.includes(id))??[]];
//
// console.log(f(obj, '05'));


onMounted(() => {
  getOptions();
})
</script>

<style lang="scss" scoped>

</style>
