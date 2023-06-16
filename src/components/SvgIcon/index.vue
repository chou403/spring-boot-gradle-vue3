<template>
  <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '1em'
  }
})

const symbolId = computed(() => `#${props.name}`)
</script>
<style lang="scss" scoped>
.svg-icon{
  fill:currentColor;
  font-size: inherit;
}
</style>
