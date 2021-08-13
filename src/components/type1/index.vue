<template>
    <Modal @close="handleClose" :show="show">
      <div class="ws-nps-form--type1">
        <div class="header">
          <img src="../../assets/images/icon_smile.png" alt="">
        </div>
        <div class="body">
          <div class="title">
            {{data.step1.title}}
          </div>
          <div class="score-box">
            <span v-for="n in 10" :key="n" 
            :class="activeIndex === n ? 'active' : ''"
            @click="handleScore(n)">{{n}}</span>
          </div>
          <div class="score-des">
            <span>{{data.start}}</span>
            <span>{{data.end}}</span>
          </div>
          <div class="title">
            {{data.step2.title}}
          </div>
          <div class="ws-nps-input-wrapper">
            <textarea class="ws-nps-input" rows="4" placeholder="Please be brutal and direct : )" :maxlength="inputLimit" v-model="reason" ></textarea>
            <span class="ws-nps__count">{{reason.length}}/{{inputLimit}}</span>
          </div>
          <div style="text-align:right;padding-top:16px">
            <button :class="disabled ? 'disabled' : ''" class="ws-nps-button" @click="handleSubmit">{{data.submit}}</button>
          </div>
        </div>
      </div>
    </Modal>

</template>

<script>
import Modal from '../common/modal'
import axios from '@/utils/axios'
import { ref, onMounted } from 'vue'

export default {
  components: {
    Modal
  },
  props: ['data'],
  setup() {
    let activeIndex = ref(null)
    let reason = ref('')
    let show = ref(false)
    let disabled = ref(true)

    //激活过渡效果
    onMounted(() => {
      show.value = true
    })

    return {
      activeIndex,
      reason,
      inputLimit: 500,
      show,
      disabled
    }
  },
  methods: {
    handleScore (n) {
      this.activeIndex = n
      this.disabled = false
    },
    handleSubmit () {
      if ( this.disabled ) return
      axios({
        method: 'post',
        url: '/collection',
        data: {
          reason: this.reason
        }
      }).then(res => {
        console.log(res)
        this.show = false
      })
    },
    handleClose (triggerFn) {
      this.show = false
      triggerFn && this.$root.destoryNps()
    }
  },
}
</script>

<style lang="scss">
.ws-nps-form--type1 {
  font-family: HarmonyOS Sans;
  color: #000;
  text-align: center;
  font-size: 16px;
  .header {
    padding: 24px 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%), linear-gradient(270deg, rgba(42, 240, 228, 0.4) 0%, rgba(140, 51, 255, 0.4) 37.5%, rgba(255, 39, 118, 0.4) 68.75%, rgba(255, 188, 15, 0.4) 100%);
  }
  .body {
    padding: 0 20px 20px;
    @media (min-width: 992px) {
      padding: 0 40px 40px;
    } 
  }
  .title {
    margin-bottom: 16px;
    font-weight: bold;
  }
  .score-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    span {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      width: 25px;
      height: 30px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: background-color .3s;
      &.active, &:hover {
        background-color: #007BFF;
        color: #fff;
      }
      @media (min-width: 992px) {
        width: 35px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
  .score-des {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 32px;
    & + div.title {
      @media (min-width: 992px) {
        padding: 0 30px;
      }
    }
  }
}
</style>