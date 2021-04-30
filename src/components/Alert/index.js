import { createVNode, render,defineAsyncComponent } from 'vue'
//import AlertConstructor from './asyncAlert.vue'

const AlertConstructor = defineAsyncComponent(() => import('./alert.vue') )

const Alert = {
  container: null,
  alert(options) {
    if ( Alert.container ) return
    let { handleClose } = options
    options.handleClose = () => {
      handleClose && handleClose()
      Alert.close()
    }
    Alert.container = document.createElement('div')
    const vnode = createVNode(AlertConstructor, options)
    render(vnode, Alert.container)
    //createRenderer(AlertConstructor, options).mount(container)

    document.body.appendChild(Alert.container)
  },
  close() {
    console.log('卸载div')
    Alert.container && document.body.removeChild(Alert.container)
    Alert.container = null
  },
  install(app) {
    app.config.globalProperties.$alert = this.alert
  }
  
}

export default Alert
