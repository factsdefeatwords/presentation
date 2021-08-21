import { createApp } from 'vue' 
import App from './App.vue'
import vLoading from './components/common/Loading/directive'

function initNPS (data = null) {
  //nps动态挂载
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(App, {data})
  app.use(vLoading)
  app.mount(container)
}

//initNPS()

export default initNPS
