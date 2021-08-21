<template>
    <Modal @close="handleClose" v-model:show="show" :top="top">
      <div class="ws-nps-form--type1 nps-form-progress" 
        :style="{ backgroundSize: progressWidth + ' 4px' }"
        v-loading="loading">
        <div class="header">
          <img :src="imgSrc" alt="">
        </div>
        <div class="body">
          <div class="content">
            <transition :name="'slide-' + direction" mode="out-in">
  
              <div v-if="step === 1">
                <div class="title">
                  {{data.step1.title}}
                </div>
                <div class="score-box flex-box">
                  <span v-for="n in 10" :key="n" 
                  :class="score === n ? 'active' : ''"
                  @click="handleScore(n)"
                  @mouseover="handleMouseover(n)"
                  @mouseleave="handleMouseleave">{{n}}</span>
                </div>
                <div class="score-des">
                  <span>{{data.start}}</span>
                  <span>{{data.end}}</span>
                </div>
              </div>

              <div v-else-if="step === 2">
                <div class="title">
                  {{data.step2.title}}
                </div>
                <div class="flex-box center">
                  <span class="select-item" v-for="(d, index) in data.step2.selections" :key="index" 
                  @click="handleSelect($event,d)"> {{d}} </span>
                  <span class="select-item" v-if="score >= 7 && score <= 8" @click="handleOther($event)">Others</span>
                </div>
              </div>

              <div v-else-if="step === 3">
                <div class="title">
                  {{data.step3.title}}
                </div>  
                <div class="ws-nps-input-wrapper">
                  <textarea class="ws-nps-input no-resize" rows="4" placeholder="Please be brutal and direct : )" :maxlength="inputLimit" v-model="reason" ></textarea>
                  <span class="ws-nps__count"><span :style="{'color': reason.length === 500 ? '#DF3636' : 'inherit'}">{{reason.length}}</span>/{{inputLimit}}</span>
                </div>
              </div>

              <div v-else>
                <div style="font-size: 32px; margin-bottom: 16px; font-weight: bold;">
                  {{data.ending1}}
                </div>
                <div>
                  {{data.ending2}}
                </div>
              </div>
  
            </transition>
  
            <div v-show="step > 1 && step !== 4" style="text-align:right; padding-top: 16px;">
              <button :class="disabled ? 'disabled' : ''" class="ws-nps-button" @click="handleSubmit">{{ ( (score >=1 && score <= 8 && step === 1) || (selectOhter && step !== 3) ) ? data.next : data.submit}}</button>
            </div>
          </div>

        </div>

      </div>
    </Modal>

</template>

<script>
import { ref, onMounted, computed } from 'vue'

import Modal from '../common/Modal/index.vue'

import axios from '@/utils/axios'
import { isMobile } from '@/utils/tools'
import { setNpsDuration } from '@/utils/tools'

import smile from '@/assets/images/icon_smile.svg'
import laugh from '@/assets/images/icon_laugh.svg'
import cry from '@/assets/images/icon_cry.svg'

const top = isMobile() ? 50 : 35

export default {
  components: {
    Modal
  },
  props: ['data'],
  setup() {
    let score = ref(0), //当前得分
        intent_score = ref(0), //鼠标悬浮得分
        reason = ref(''), //用户手动输入原因
        show = ref(false), //modal层显示&隐藏控制
        submited = ref(false), //防止重复点击提交按钮
        step = ref(1), //记录当前完成步骤
        direction = ref('left'), //动态改变过渡方向
        selections = [], //记录多选
        selected = ref(false), //记录是否有选择
        selectOhter = ref(false), //是否需要填写other
        loading = ref(false)

    //激活过渡效果
    onMounted(() => {
      show.value = true
    })

    let disabled = computed( () => {
      let result = true
      if (score.value > 0 && step.value === 1) {
        result = false
      }

      if (step.value === 2 ) {
        if (selected.value) {
          result = false
        }
        
        if ((score.value === 7 || score.value === 8) && selectOhter.value) {
          result = false
        }
      }

      if (step.value === 3 && reason.value.length > 0 ) {
        result = false
      }

      return result
    } )

    let progressWidth = computed( () => {
      let w = 0
      if (step.value === 4 ) {
        w = 100
      }

      if (step.value === 3 ) {
        w = 66.7
      }

      if (step.value === 2 ) {
        if (score.value < 7 || selectOhter.value) {
          w = 33.3
        }else {
          w = 50
        }
      }

      return w + '%'
    } )

    let imgSrc = computed( () => {
      let src = smile
      if (score.value >= 9 || intent_score.value >=9 || step.value === 4) {
        src = laugh
      }
      if (( score.value >= 1 && score.value <= 6 ) || ( intent_score.value >=1 && intent_score.value <=6 )) {
        src = cry
      }

      return src
    } )

    return {
      top,
      score,
      intent_score,
      reason,
      inputLimit: 500,
      show,
      disabled,
      submited,
      selections,
      selected,
      selectOhter,
      step,
      direction,
      loading,
      progressWidth,
      imgSrc
    }
  },
  methods: {
    handleMouseover (n) {
      this.intent_score = n
    },
    handleMouseleave () {
      this.intent_score = 0
    },
    handleSelect (e, msg) {
      let cl = e.target.classList
      
      cl.contains('active') ? this.selections.splice(this.selections.indexOf(msg), 1) : this.selections.push(msg)
      cl.toggle('active')
      this.selected = this.selections.length > 0 ? true : false
    },
    handleOther (e) {
      let cl = e.target.classList
      cl.toggle('active')
      this.selectOhter = !this.selectOhter
    },
    handleScore (score) {
      this.score = score
      this.direction = 'left'

      if (this.score < 9) {
        if (this.score < 7) {
          this.selectOhter = true
        }
        this.step = 2
        return
      }
      this.handleSubmit()
    },
    handleSubmit () {
      if ( this.disabled || this.submited ) return
    
      // if (this.step === 1 && this.score < 9) {
      //   if (this.score < 7) {
      //     this.selectOhter = true
      //   }
      //   this.step = 2
      //   return
      // }

      if (this.step === 2 && this.selectOhter) {
        this.step = 3
        return
      }

      this.submited = true

      /* 数据处理 */
      let data = {}
      data.score = this.score
      this.data.step2.selections

      for ( let m of this.data.step2.selections ) {
        data[m] = this.selections.indexOf(m) > -1 ? m : ''
      }
      data.other = this.reason
      this.loading = true
      /* 发送请求 */
      axios({
        method: 'post',
        url: '/collection',
        data,
      }).then(res => {
        this.loading = false
        this.step = 4
        setNpsDuration(7)
        setTimeout(() => {
          this.show = false
        }, 2000)
      }).catch(err => {
        //错误处理，接口调用失败依然关闭弹窗
        this.show = false
        setNpsDuration(1)
      })
    },
    
    handleClose (triggerFn) {
      //主动点击关闭，销毁实例，并一天内不再出现
      !this.submited && setNpsDuration(1)
      this.$root.destoryNps()
    }
  },
}
</script>

<style lang="scss">
$width: 500px;
$solid_height: 312px;
$img_height: 92px;
$padding_bottom: 8px;

.ws-nps-form--type1 {
  box-sizing: border-box;
  font-family: HarmonyOS Sans;
  color: #000;
  text-align: center;
  font-size: 16px;
  position: relative;
  width: $width;
  max-width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    left: 0;
    top: 0;
    z-index: -1;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 31.73%), linear-gradient(270deg, rgba(42, 240, 228, 0.4) 0%, rgba(140, 51, 255, 0.4) 37.5%, rgba(255, 39, 118, 0.4) 68.75%, rgba(255, 188, 15, 0.4) 100%), #FFFFFF;
  }
  @media (min-width: 992px) {
    min-height: $solid_height;
  }
  .back {
    position: absolute;
    left: 8px;
    top: 4px;
    cursor: pointer;
  }
  .header {
    box-sizing: border-box;
    text-align: center;
    padding-bottom: $padding_bottom;
    line-height: 0;
    img {
      margin-top: - ($img_height / 2);
    }
  }
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    box-sizing: border-box;
    padding: 0 20px 20px;
    overflow: hidden;
    @media (min-width: 992px) {
      padding: 0 40px 24px;
    } 
  }
  .title {
    margin-bottom: 16px;
    font-weight: bold;
    @media (min-width: 992px) {
      font-size: 18px;
    }
  }
  .flex-box {
    display: flex;
    .selection {
      flex: 0 0 auto;
      padding: 8px 12px;
    }
    &.center {
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: -6px;
      span {
        margin: 0 4px 6px;
        padding: 8px 12px;
        font-size: 14px;
      }
    }
    span {
      font-size: 14px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: background-color .3s;
      white-space: nowrap;
    }
    .select-item {
      &:hover {
        background-color: rgba(139, 90, 255, 0.1);
      }
      &.active {
        background-color: rgba(139, 90, 255, 0.2);
      }
    }
  }
  .score-box {
    justify-content: space-between;
    padding-top: 8px;
    margin-bottom: 16px;
    span {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 30px;
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
    & + div.title {
      @media (min-width: 992px) {
        padding: 0 30px;
      }
    }
  }
  &.nps-form-progress {
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(270deg, rgba(42, 240, 228, 0.6) 0%, rgba(140, 51, 255, 0.6) 37.5%, rgba(255, 39, 118, 0.6) 68.75%, rgba(255, 188, 15, 0.6) 100%);
    background-position: left bottom;
    background-repeat: no-repeat;
    background-size: 0 4px;
    transition: background-size .3s;
  }
}
</style>