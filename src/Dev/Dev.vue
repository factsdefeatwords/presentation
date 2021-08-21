<template>
  <div class="url-input-wrapper">
    <input class="url-input" type="text" v-model="url" placeholder="输入合法网址">
    <button @click="getPage">获取页面</button>
  </div>
  <button class="clearbutton" @click="handleClearStorage">清除nps缓存并刷新页面</button>
</template>

<script>

import { ref } from 'vue'
import axios from '@/utils/axios'

let pageDom = null

export default {
  setup() {
    let url = ref('https://www.wondershare.com/')
    
    return {
      url
    }
  },
  mounted() {
    // this.createDom()
    // this.getPage()
  },
  methods: {
    createDom() {
      //切换爬虫页面前清除dom引用，避免内存泄漏
      if (pageDom) {
        document.body.removeChild(pageDom)
        pageDom = null
      }
      pageDom = document.createElement('div')
      document.body.insertBefore(pageDom, document.body.firstChild)
    },
    getPage(){
      this.createDom()
      axios({
        method: 'get',
        url: '/getpage?url=' + this.url
      }).then( res => {
        if (res.code == 0) {
          let { scripts, inlineScript, staticDom  } = res.data
          pageDom.innerHTML = staticDom

          scripts = scripts.map(src => () => new Promise( resolve => {
            const script = document.createElement('script')
            script.src = src
            pageDom.appendChild(script)
            script.onload = () => resolve(src)
          }))

          async function getSctips () {
            for (let p of scripts) {
              await p()
            }
                     
            let script = document.createElement('script')
            script.appendChild(document.createTextNode( inlineScript )) //ie不支持
            pageDom.appendChild(script)
          }

          getSctips()

        }
      })
    },
    handleClearStorage () {
      localStorage.removeItem('ws_nps')
      location.reload()
    }
  },
}
</script>

<style lang="scss">
.url-input-wrapper {
  position: fixed;
  left: 10px;
  top: 10px;
  width: 550px;
  z-index: 999;
  overflow: hidden;
  white-space: nowrap;
  transition: width .3s;
  input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    width: 450px;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
  }
  button {
    width: 80px;
    height: 40px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #007BFF;
    border: 1px solid #007BFF;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 14px;
    font-family: inherit;
    border-radius: 4px;
  }
}
.clearbutton {
  position: fixed;
  z-index: 999;
  right: 10px;
  top: 10px;
  height: 40px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #007BFF;
  border: 1px solid #007BFF;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  outline: none;
  margin: 0;
  font-weight: 500;
}
</style>