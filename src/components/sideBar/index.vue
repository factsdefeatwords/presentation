<template>
  <div class="side-bar">
    <nav class="bd-links">
      <template v-for="(route,index) in routes" :key="index">
        <side-bar-item :item="route"  ></side-bar-item>
      </template>
    </nav>
  </div>
</template>

<script>
import sideBarItem from './sideBarItem'
export default {
  name: 'SideBar',
  components: {
    sideBarItem
  },
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  }
}
</script>

