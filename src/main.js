import { createApp } from 'vue' 
import App from './App.vue' 

function initNPS (data = null) {
  //nps动态挂载
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(App, data) 
  app.mount(container)

  //创建临时全局对象，完成插件功能调用卸载方法并取消引用
  window.npsApp = app
}

//initNPS()

export default initNPS
