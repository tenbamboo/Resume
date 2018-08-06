<template>
  <div ref="wrapper" class="cainScrollWrapper">

    <div class="cainScrollWrap" :style="scrollerStyle" ref="cainScrollWrap">
      <div class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
        </div>
      </div>
      <div class="scroll" ref="scroller">
        <slot/>
      </div>

    </div>
  </div>
</template>

<script>
// function

// event
// pullingUp //上拉加载更多 注意当属性pullUpLoad=true是可用
// pullingDown // 下拉刷新 注意当属性pullDownRefresh = true 是可用

// import { Picker, Button } from 'mint-ui'
import Cain from '@cain/'
import BScroll from 'better-scroll'
import Bubble from '../bubble/'
import Loading from '../LoadingGIF/'
export default {
  name: 'cain-scroller',
  data () {
    return {
      scroller: null,
      scrollerStyle: '',
      isPullingDown: false,
      isPullUpLoad: false,
      pullDownStyle: {},
      bubbleY: 0, // 气泡提示
      pullDownInitTop: -50, // 下拉加载提示
      refreshDelay: 20,
      beforePullDown: true,
      isRebounding: false
    }
  },
  props: {
    value: {},
    top: {
      type: String,
      default: 'auto'
    },
    bottom: {
      type: String,
      default: 'auto'
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.pullDownStyle = `top:${this.pullDownInitTop}px`
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // if (this.pullDownRefresh || this.pullUpLoad) {
      //   let height = this._getRect(this.$refs.wrapper).height + 1
      //   console.log(height)
      //   this.scrollerStyle += `min-height:${height}px;`
      //   // this.$refs.wrapper.style.minHeight = `${height}px`
      // }
      if (!Cain.isBlank(this.top)) {
        this.scrollerStyle += `top:${this.top}px;`
      }
      if (!Cain.isBlank(this.bottom)) {
        this.scrollerStyle += `bottom:${this.bottom}px;`
        // this.scrollerStyle.bottom = this.bottom
      }
      let config = this._getConfig()

      this.scroller = new BScroll(this.$refs.scroller, config)

      if (this.pullUpLoad) {
        this._initPullUpLoadEvent()
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefreshEvent()
        this._afterPullDown()
      }
      this.refresh()
    },
    // 获取scroll config信息
    _getConfig () {
      let config = {
        bounceTime: 300,
        observeDOM: false,
        click: true
      }
      // 上拉加载
      if (this.pullUpLoad) {
        config.pullUpLoad = {
          threshold: 100
        }
      }
      // 下拉刷新加载
      if (this.pullDownRefresh) {
        config.pullDownRefresh = {
          threshold: 50,
          stop: 20
        }
      }
      return config
    },
    // 初始化上拉加载更多事件
    _initPullUpLoadEvent () {
      this.scroller.on('pullingUp', () => {
        this.isPullUpLoad = true
        this.$emit('pullingUp')
      })
    },
    // 初始化下拉刷新加载事件
    _initPullDownRefreshEvent () {
      this.scroller.on('pullingDown', () => {
        this.isPullingDown = true
        this.beforePullDown = false
        this.$emit('pullingDown')
      })

      this.scroller.on('scroll', pos => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (40 - pos.y)}px`
        }
      })
    },
    _getRect (el) {
      if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      } else {
        return {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        }
      }
    },
    // 标记结束事件并刷新
    finish () {
      if (this.isPullingDown) {
        this.forceUpdate()
        this.scroller.finishPullDown()
      }
      if (this.isPullUpLoad) {
        this.scroller.finishPullUp()
      }
      this.refresh()
    },
    // 刷新DOM数据
    refresh () {
      this.$nextTick(() => {
        this.scroller && this.scroller.refresh()
      })
    },
    _reboundPullDown () {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroller.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown () {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroller.options.bounceTime)
    },
    forceUpdate (dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      }
    }
  },
  components: {
    Bubble,
    Loading
  }
}
</script>

<style   lang="scss">
.cainScrollWrapper {
  height: 100%;
  position: relative;
  .cainScrollWrap {
    position: fixed;
    // position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    // bottom: 30px;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;

    .scroll {
      height: 100%;
      &::after {
        display: table;
        content: " ";
        clear: both;
        height: 20px;
      }
    }
    .pulldown-wrapper {
      position: absolute;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all;
      .after-trigger {
        margin-top: 10px;
      }
    }
  }
}
</style>
