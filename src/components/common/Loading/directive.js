import { createVNode, render } from 'vue'
import Loading from './index.vue'

const loadingDirective = {}
loadingDirective.install = app => {

  const createLoading = (el, binding) => {
    const vm = binding.instance
    const leaveExr = el.getAttribute('ws-loading-leave')

    const handleLeave = Object.prototype.toString.call(vm[leaveExr]) === '[object Function]' ? vm[leaveExr] : null

    const vLoading = createVNode(Loading, handleLeave ? { handleLeave } : null)
    render(vLoading, el)
    el.instance = vLoading.component.ctx
  }

  app.directive('loading', {
    mounted: function(el, binding) {
      createLoading(el, binding)
      const instance = el.instance
      !!binding.value && instance.show()
    },

    updated: function(el, binding) {
      const instance = el.instance
      if (binding.oldValue !== binding.value) {
        !!binding.value ? instance.show() : instance.close()
      }
    },

    unmounted: function(el) {
      el.instance = null
    }
  })
}

export default loadingDirective