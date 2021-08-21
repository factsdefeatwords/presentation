<template>
  <transition name="fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave(1)">
    <div class="ws-nps-modal" v-if="showModal">
      <transition name="slide-down-in"
       @after-leave="afterLeave(2)">
        <div 
        class="ws-nps-modal-center" 
        :style="{ top: top + '%' }"
        v-show="showDialog" >
          <span class="close" 
            @click="handleClose">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 3.5L8 8M8 8L3.5 12.5M8 8L3.5 3.5M8 8L12.5 12.5" stroke="black" stroke-opacity="0.72" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'Modal',
  emits: ['close', 'update:show'],
  props: {
    show: {
      type: Boolean,
      require: true,
      default: () => false
    },
    top: {
      type: Number,
      default: () => 50
    }
  },
  setup(props) {
    document.body.classList.add('ws-nps-modal--hidden')

    let showDialog = ref(false)
    let showModal = ref(false)

    watch( 
      () => props.show,
      val => {
        if (val) {
          showModal.value = val
        }else {
          showDialog.value = val
        }
      }
    )

    return {
      showDialog,
      showModal
    }
  },

  methods: {
    handleClose() {
      this.showDialog = false
    },
    handleTransitionEnd() {
      this.showModal = false
    },
    afterEnter() {
      this.showDialog = true
    },
    afterLeave(type) {
      type === 1 && (document.body.classList.remove('ws-nps-modal--hidden'),this.$emit('close')),this.$emit('update:show', false)
      type === 2 && this.handleTransitionEnd()
    }
  },
}
</script>

<style lang="scss">
  .ws-nps-modal--hidden { overflow: hidden !important; }
  .ws-nps-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9999;
    .ws-nps-modal-center {
      max-width: calc(100% - 30px);
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      .close {
        position: absolute;
        padding: 4px;
        right: 8px;
        top: 4px;
        cursor: pointer;
        z-index: 99;
      }
    }
  }

</style>