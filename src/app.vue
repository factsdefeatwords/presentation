<template>
  <div class="my-app">
    <p @click="sayHi">{{ number }}</p>
    <h1>{{obj.arr[0]}}</h1>
    <div style="padding: 20px">
      <input type="text" v-model="ipaddress">
    </div>
    <h2>{{ipaddress}}</h2>
    <button @click="add">增加</button>

    <p v-for="n in 10" :key="n"> {{ n + number }} </p>
    <com @handleemit="sayHi" :number="1" id="3"></com>
    <demo></demo>

    <!-- <router-view></router-view> -->
    <input type="file" @change="handleFileChange" v-if="showFile">

  </div>
</template>

<script>
import XLSX, { read } from 'xlsx'
import { ref,reactive } from 'vue'
import com from './views/component1'
import demo from './components/Alert/alert.js'
const axios = require('axios')

export default {
  name: 'App',
  components: {
    com,
    demo
  },
  data() {
    let vm = this
    return {
      obj: vm.getData(),
      showFile: true,
      nps: 0 //净推荐值(NPS)=(推荐者数/总样本数)×100%-(贬损者数/总样本数)×100%
    }
  },
  setup(props, context) {
    let number = ref(0)
    let ipaddress = ref('')
    let a = {
      val: 0,
      valueOf(){
        return ++this.val
      }
    }

    if(a == 1 && a == 2 && a == 3) {
      console.log(666)
    }

    console.log(a)
    
    function add() {
      number.value++
      this.$alert(
        { 
          msg: '哈哈哈哈',
          handleClose() {
            console.log('我被关闭了，啊哈哈哈哈哈哈')
          }
        }
      )
    }

    return { number, add, ipaddress }
  },
  methods: {
    handleFileChange (e) {
      this.showFile = false
      let reader = new FileReader()
      let file = e.target.files[0]
      let nps = {}
      reader.readAsBinaryString(file)

      reader.onload = e => {
        const data = e.target.result, zzexcel = XLSX.read(data, { type: 'binary' }), result = []
        for (let i = 0; i < zzexcel.SheetNames.length; i++) {
          const newData = XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
          result.push(...newData)
        } 

        this.showFile = true
        
        for ( let i = 1; i < 11; i++ ) {
          nps[i] = 0
        }
        for ( let i = 1, len = result.length; i < len; i++ ) {
          nps[result[i].nps] += 1
        }
        console.log(nps)
        let sum = 0, r_number = 0, d_number = 0
        for ( let k in nps ) {
          sum += (nps[k] * +k)
          r_number += (+k >= 9 ? (nps[k] * +k) : 0)
          d_number += (+k <= 6 ? (nps[k] * +k): 0)
        }

        console.log(sum)
        console.log(r_number)
        console.log(d_number)

        this.nps = (r_number - d_number) / sum * 100 + '%'
      }
    },
    sayHi(e) {
      console.log(e)

      axios.get(`/getIpaddress?ip=${this.ipaddress}`).then(res => {
        
      })
    },
    getData(){
      return {a:1,arr:[1,2]}
    }
  }
}
</script>