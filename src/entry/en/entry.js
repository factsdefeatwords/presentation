import triggerNPS from "@/commonEntry"
import data from './data'
import { getFont } from '@/utils/tools'

export default function () { triggerNPS(data, () => getFont('https://neveragain.allstatics.com/2019/assets/style/font-custom-hm.min.css')) }