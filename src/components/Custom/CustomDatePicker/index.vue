<template>
  <el-date-picker
      v-model="data.value"
      value-format="YYYY-MM-DD"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :type="type"
  />
</template>

<script lang="ts" setup>
type pickerType =
    "year"
    | "month"
    | "date"
    | "dates"
    | "datetime"
    | "week"
    | "datetimerange"
    | "daterange"
    | "monthrange"

const props = withDefaults(defineProps<{
  value?: any,
  startDate?:any
  endDate?:any
  type?: pickerType
  placeholder?: string
}>(), {
  placeholder: '请选择',
  type: "date"
})

const emits = defineEmits<{
  (event: 'update:value', val: any): void
  (event: 'update:startDate', val: any): void
  (event: 'update:endDate', val: any): void
}>()

const data: any = reactive({
  value: computed({
    get: () => {
      if(props.type=="daterange"){
        return [props.startDate,props.endDate]
      }else{
        return props.value
      }
    },
    set: val => {
      if(props.type=="daterange"){
        Array.isArray(val)?emits('update:startDate', val[0]):emits('update:startDate', '')
        Array.isArray(val)?emits('update:endDate', val[1]):emits('update:endDate', '')
      }else{
        emits('update:value', val);
      }
    }
  }),
})
</script>

<style scoped>

</style>
