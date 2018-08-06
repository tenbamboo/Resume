<template>

  <div>
    <div class="navigationWrap" v-if="isShowTabbar">
      <div class="navigation">
        <div class="navigationItem" v-for="(item,index) in proxyPrarm" :key="index" :class="{selected : selected == item.url}" @click="navigation(item.url)">
          <!-- <mt-badge type="error" size="small" v-if="index === 2 && unReadIMCount > 0">{{unReadIMCount | redPointFilter}}</mt-badge>
          <mt-badge type="error" size="small" v-if="index === 3 && unReadMyCount > 0">{{unReadMyCount | redPointFilter}}</mt-badge> -->
          <!-- <div class="imgWrap"> -->
          <img v-show="selected !== item.key" :src="`static/image/tabbar/${item.key}.png`">
          <img v-show="selected === item.key" :src="`static/image/tabbar/${item.key}S.png`">
          <!-- </div> -->
          <p>{{item.text}}</p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
// import { Badge } from 'mint-ui'
import { mapState } from 'vuex'
// import Cain from '@cain/'
export default {
  name: 'cain-navigation',
  props: {
    param: {
      type: Array
    }
  },
  data () {
    return {
      proxyPrarm: this.param,
      selected: '',
      isShowTabbar: false
    }
  },
  computed: mapState({
    unReadIMCount: 'unReadIMCount',
    unReadMyCount: 'unReadMyCount'
  }),
  watch: {
    $route (to, from) {
      this.isShowTabbar = to.meta.isShowBar
      this.selected = this.getSelectedStr()
    }
  },
  filters: {
    redPointFilter (val) {
      if (val >= 99) {
        return '●'
      }
      return val
    }
  },
  mounted () {},
  methods: {
    navigation (url) {
      this.$router.replace(url)
      this.selected = url
    },
    // 后去选择的菜单项
    getSelectedStr () {
      if (!this.$route.name) {
        return ''
      }
      const path = this.$route.fullPath
      for (let item of this.proxyPrarm) {
        if (path.indexOf(`${item.url}`) !== -1) {
          return item.key
        } else if (path === '/') {
          return 'index'
        }
      }
    }
  },
  component: {
    // [Badge.name]: Badge
  }
}
</script>

<style scoped lang="scss" >
.navigationWrap {
  // height: 125px;
  .navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    display: flex;
    text-align: center;
    .navigationItem {
      border-top: 1px solid #e3e3e3;
      background-color: #ffffff;
      flex: 1;
      position: relative;
      line-height: 0;
      padding: 10px;
      img {
        width: 50px;
        height: 50px;
        display: inline-block;
        vertical-align: middle;
        margin-top: 5px;
        margin-bottom: 25px;
        // }
      }
      p {
        font-size: $fs25;
        color: #666666;
        margin-bottom: 15px;
      }
      &.selected p {
        color: $mainColor;
      }
    }
  }
}
</style>
