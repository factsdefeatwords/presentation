<template>
  <div class="dc-doc-item">
    <template v-if="!item.children">
      <router-link v-if="!nested"  :to="item.path" class="d-block" :style="`padding-left:${1*count}rem`">{{item.meta.title}}</router-link>
      <template v-else>
        <ul class="dc-sidenav">
          <li>
            <router-link :to="resolvePath(item.path)" class="d-block" :style="`padding-left:${1*count}rem`">{{item.meta.title}}</router-link>
          </li>
        </ul>
      </template>
    </template>
    <template v-else>
      <div class="title d-flex justify-content-between align-items-center" 
        :class="{'dc-exact-active': currentParentSlideState,'slideDown':currentSlideState}"
        @click="toggleSlide()"
        :style="`padding-left:${1*count}rem`">
          {{item.meta.title}}
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
            <polygon points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12"></polygon>
          </svg>
      </div>
      <side-bar-item v-for="child in item.children" :key="child.path" :base-path="resolvePath(item.path)" :nested="true" :item="child" :count="count+1"></side-bar-item>
    </template>
  </div>
</template>


<script>
export default {
  name: "SideBarItem",
  data() {
    return {
      currentSlideState:false,
      currentParentSlideState:false,
    }
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: ''
    },
    nested: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1
    }
  },
  created(){
    this.pathTo(this.$route.matched[0].path)
  },
  methods:{
    resolvePath(routePath){
      return path.resolve(this.basePath, routePath)
    },
    pathTo(p){
      if(this.item.path === p){
        this.currentSlideState = true
      }else{
        this.currentSlideState = false
      }
    },
    toggleSlide(){
      this.currentSlideState = !this.currentSlideState
    }
  }
};
</script>
