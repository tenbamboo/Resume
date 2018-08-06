<template>
  <div class="rootContainer" :class="$route.meta.background">

    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
// import Cain from '@cain/'
import CainNavigation from '@cain/components/Navigation/'
// import Vue from 'vue'
export default {
  data () {
    return {
    }
  },
  created () {},
  mounted () {
    // this.initWatchJkx()
    // this.hideOverlay()
  },
  methods: {
    initWatchJkx () {
      // Object.defineProperties(jkx, {
      //   openid: {
      //     get () {
      //     },
      //     set (newValue) {
      //       this.hideOverlay()
      //     }
      //   }
      // })
    },
    hideOverlay () {
      let overlay = document.getElementById('rootOverlay')
      overlay.classList.add('hiddenReady')
      setTimeout(() => {
        overlay.remove()
      }, 1000)
    }
  },
  components: {
    CainNavigation
  }
}
</script>

<style  scoped   lang="scss">
.rootContainer {
  height: 100%;
}
.gray{
  background-color: #efefef;
}
.white{
  background-color: #fff;
}
</style>
