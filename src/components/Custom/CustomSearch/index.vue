<template>
  <el-form :model="form" label-width="80px">
    <el-row :gutter="20">
      <template v-for="(item,index) in props.search.configure" :key="index">
        <el-col v-if="!item.type||item.type==='input'" :span="item?.span||defaultConfigure.span">
          <el-form-item :label="item.label">
            <el-input v-model="form[item.name]" :placeholder="item.placeholder"/>
          </el-form-item>
        </el-col>
        <el-col v-else-if="item.type==='number'" :span="item?.span||defaultConfigure.span">
          <el-form-item :label="item.label">
            <el-input v-model="form[item.name]" type="number" :placeholder="item.placeholder"/>
          </el-form-item>
        </el-col>
        <el-col v-else-if="item.type==='password'" :span="item?.span||defaultConfigure.span">
          <el-form-item :label="item.label">
            <el-input v-model="form[item.name]" type="password" :placeholder="item.placeholder"/>
          </el-form-item>
        </el-col>
        <el-col v-else-if="item.type==='textarea'" :span="item?.span||defaultConfigure.span">
          <el-form-item :label="item.label">
            <el-input v-model="form[item.name]" autosize :rows="3" type="textarea" :placeholder="item.placeholder"/>
          </el-form-item>
        </el-col>
        <el-col v-else-if="item.type==='radio'" :span="item?.span||defaultConfigure.span">
          <el-form-item :label="item.label">
            <custom-radio v-model:value="form[item.name]" :options="item.options" :custom="item.custom"/>
          </el-form-item>
        </el-col>
        <el-col v-else-if="item.type==='checkBox'" :span="item?.span||defaultConfigure.span">
          <el-form-item :label="item.label">
            <custom-check-box v-model:value="form[item.name]" :options="item.options" :custom="item.custom"/>
          </el-form-item>
        </el-col>
        <el-col v-else-if="item.type==='select'" :span="item?.span||defaultConfigure.span">
          <el-form-item :label="item.label">
            <custom-select v-model:value="form[item.name]" :placeholder="item.placeholder" :options="item.options"
                           :custom="item.custom"/>
          </el-form-item>
        </el-col>
      </template>
      <el-col :span="defaultConfigure.span">
        <el-form-item label-width="0">
          <el-button type="primary" @click="onSearch">
            <el-icon><Search /></el-icon><span class="search-btn__left">查询</span>
          </el-button>
          <el-button @click="onReset">
            <el-icon><Refresh /></el-icon><span class="search-btn__left">重置</span>
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const props = defineProps<{
  search: any,
}>()

const emits = defineEmits<{
  (event: 'onSearch',name:any): void
}>()

let form: any = ref({})

const defaultConfigure={
  span:6
}

/** 搜索*/
const onSearch = () => {
  emits('onSearch',form.value)
}

/** 重置*/
const onReset = () => {
  form.value={};
  emits('onSearch',form.value)
}


onMounted(() => {

})

</script>

<style lang="scss" scoped>

</style>
