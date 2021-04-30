<template>
  <div @click="$emit('handleemit','哈哈哈')">
    {{number}}
  </div>
</template>

<script>
import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount} from 'vue'
export default {
  props: ['number'],
  emits: ['handleemit'],
  setup(props, context) {
    console.log(context.attrs)
  },
  watch: {
    number() {
      console.log('6666')
    }
  },
}
</script>
