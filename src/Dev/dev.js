// import triggerNPS from './commonEntry'

// import data from '@/lang/en/data'
// import fr_data from '@/lang/fr/data'

// import { triggerNps_Scroll } from './utils/tools'

// triggerNps_Scroll(() => triggerNPS(data))

import { createApp } from 'vue' 
import Dev from './Dev.vue'
import triggerNPS from '@/entry/en/entry'

document.body.style.minHeight = '2000px'

createApp(Dev).mount('#app')

triggerNPS()