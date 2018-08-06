<template>

  <div class="cainToast">
    <transition name="fade">
      <div class="toast" v-if="isShow">
        <img class="iconImg" :src="iconStr" />
        <p>{{msg}}</p>
      </div>
    </transition>

    <transition name="fade">
      <div class="overlay" v-if="isShow"></div>
    </transition>
  </div>

</template>

<script>
import successIcon from './img/success.png'
import errorIcon from './img/error.png'
export default {
  data () {
    return {
      isShow: false,
      iconStr: '',
      msg: ''
    }
  },

  methods: {
    show (msg, icon, duration = 3000) {
      this.iconStr = icon === 'success' ? successIcon : errorIcon
      this.msg = msg
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, duration)
    },
    success (msg, duration) {
      this.show(msg, 'success', duration)
    },
    error (msg, duration) {
      this.show(msg, 'error', duration)
    }
  },
  components: {}
}
</script>

<style scoped lang="scss" >
.cainToast {
  .overlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 200;
  }
  .toast {
    padding: 60px 20px;
    z-index: 201;
    background-color: #fff;
    width: 70%;
    min-height: 280px;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    font-size: $fs34;
    border-radius: 20px;
    .iconImg {
      width: 79px;
      height: 79px;
      margin-bottom: 40px;
    }
    p {
      word-break: break-all;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
