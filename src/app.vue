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
  </div>
</template>

<script>
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
      obj: vm.getData()
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