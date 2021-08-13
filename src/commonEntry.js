const createNPS = (data) => import(/* webpackChunkName: "nps-entry" */ './main.js').then(m => m.default(data))
import { triggerNps_Scroll } from './utils/tools'

const triggerNPS = (data) => triggerNps_Scroll(() => createNPS(data))

export default triggerNPS