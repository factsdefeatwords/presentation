<template>
  <transition name="fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave(1)">
    <div class="ws-nps-modal" v-if="show">
      <transition name="slide-down-in"
       @after-leave="afterLeave(2)">
        <div class="ws-nps-modal-center" v-show="showDialog">
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
import { ref } from 'vue'
export default {
  name: 'Modal',
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
  },
  setup() {
    document.body.classList.add('ws-nps-modal--hidden')

    let showDialog = ref(false)

    return {
      showDialog
    }
  },

  methods: {
    handleClose() {
      this.showDialog = false
    },
    handleTransitionEnd() {
      this.$emit('close')
    },
    afterEnter() {
      this.showDialog = true
    },
    afterLeave(type) {
      type === 1 && (document.body.classList.remove('ws-nps-modal--hidden'),this.$emit('close', true))
      type === 2 && this.handleTransitionEnd()
    }
  },
}
</script>

<style lang="scss">
  .ws-nps-modal--hidden { overflow: hidden !important; }
  .ws-nps-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9999;
    .ws-nps-modal-center {
      width: 500px;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      max-width: calc(100% - 30px);
      position: relative;
      .close {
        position: absolute;
        padding: 4px;
        right: 8px;
        top: 4px;
        cursor: pointer;
      }
    }
  }

/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-in-enter-active,
.slide-down-in-leave-active {
  transition: all 0.3s ease;
}

.slide-down-in-enter-from,
.slide-down-in-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>