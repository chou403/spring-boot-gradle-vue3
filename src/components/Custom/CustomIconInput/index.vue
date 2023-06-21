<template>
  <el-popover
      placement="bottom"
      :width="300"
      trigger="click"
  >
    <template #reference>
      <el-input
          v-model="data.value"
          disabled
          placeholder="请选择图标"
      >
        <template #prepend>
          <el-button v-if="data.value.indexOf('local')>=0">
            <SvgIcon :name="data.value"/>
          </el-button>
          <el-button v-else :icon="data.value"></el-button>
        </template>
      </el-input>
    </template>
    <div class="tab-pane-box">
      <el-tabs type="border-card">
        <el-tab-pane label="ele">
          <div class="icon-box">
            <el-button v-for="item in data.elIcons" :icon="item" :type="data.value===item?'primary':''"
                       @click="changeIcon(item)" plain>
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="本地">
          <div class="icon-box">
            <el-button :type="data.value===item?'primary':''" v-for="item in data.localIcons" @click="changeIcon(item)"
                       plain>
              <SvgIcon :name="item"/>
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-popover>

</template>

<script lang="ts" setup>
import {reactive,getCurrentInstance,computed} from "vue";
import SvgIcon from '@/components/SvgIcon/index.vue'
import {customType} from "@/components/Custom/types";

const modules = import.meta.glob('@/assets/svg/*.svg')
const proxy:any=getCurrentInstance()?.proxy;

const props = withDefaults(defineProps<{
  value: any,
}>(), {
})

const emits = defineEmits<{
  (event: 'update:value', value: any): void
}>()

const data: any = reactive({
  value: computed({
    get:()=>props.value||'',
    set:val=>{
      emits('update:value', val);
    }
  }),
  localIcons: [],
  elIcons: proxy.$icons
})

for (const path in modules) {
  data.localIcons.push('local-' + path.split('/src/assets/svg/')[1].split('.svg')[0])
}

const changeIcon = (value: string) => {
  data.value = value
}
</script>

<style lang="scss">
.el-tabs__content {
  padding: 0 !important;
}
.el-input.is-disabled .el-input__inner{
  cursor: pointer !important;
}
.icon-box {
  display: flex;
  flex-wrap: wrap;
  max-height: 250px;
  overflow-y: auto;
  padding: 11px;

  .el-button {
    margin-bottom: 10px;
    margin-right: 15.5px;
    margin-left: 0 !important;
    width: 36px;
    padding: 0 !important;
    &:nth-child(5n){
      margin-right: 0;
    }
  }
}
</style>
