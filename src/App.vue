<template>
  <Type :data="data"></Type>
</template>

<script>
/**
 * 所有组件调试入口，根据实际打包需求修改引用路径
 */

import Type from './components/type1'

export default {
  components: {
    Type
  },
  props: ['data'],
  setup() {
    
  },
  methods: {
    //提供全局跟组件方法销毁实例
    destoryNps () {
      window.npsApp.unmount()
      window.npsApp = null
    }
  },
}
</script>

<style lang="scss">
@import './assets/style/global.scss';
</style>

