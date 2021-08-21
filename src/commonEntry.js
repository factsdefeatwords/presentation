const createNPS = (data) => import(/* webpackChunkName: "nps-entry" */ './main.js').then(m => m.default(data))
import { triggerNps_Scroll, getNpsDuration } from './utils/tools'

/**
 * 
 * @param  data  组件数据，根据组件类型配置并传入
 * @param  callback 回调函数，用于动态加载外部资源（如字体）
 */
const triggerNPS = (data, callback) => {
  const n = getNpsDuration()

  if (n.new || n.expired) {
    triggerNps_Scroll(() => createNPS(data))
    callback && callback()
  }
}

export default triggerNPS