<template>
  <div v-if="isShowToast" class="toast-container">
    <span class="loading-text">{{ content }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowToast: true,
      content: ''
    }
  }
}
</script>

<style scoped>
  .toast-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .1);
  }
  .toast-msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    padding: 35px;
    border-radius: 10px;
    font-size: 28px;
    line-height: 36px;
    background-color: #eee;
    color: #666;
  }
</style>