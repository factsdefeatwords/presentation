import triggerNPS from './commonEntry'

import data from '@/lang/en/data'
import fr_data from '@/lang/fr/data'

import { triggerNps_Scroll } from './utils/tools'

triggerNps_Scroll(() => triggerNPS({data}))