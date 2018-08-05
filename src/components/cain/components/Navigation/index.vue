<template>

  <div>
    <div class="navigationWrap" v-if="isShowTabbar">
      <div class="navigation">
        <div class="navigationItem" v-for="(item,index) in proxyPrarm" :key="index" :class="{selected : selected == item.key}" @click="navigation(item.key)">
          <mt-badge type="error" size="small" v-if="index === 2 && unReadIMCount > 0">{{unReadIMCount | redPointFilter}}</mt-badge>
          <mt-badge type="error" size="small" v-if="index === 3 && unReadMyCount > 0">{{unReadMyCount | redPointFilter}}</mt-badge>
          <div class="imgWrap">
            <img v-show="selected !== item.key" :src="`static/image/${item.key}.png`">
            <img v-show="selected === item.key" :src="`static/image/${item.key}S.png`">
          </div>
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
        if (path.indexOf(`/${item.key}`) !== -1) {
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
  height: 50px;
  .navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    display: flex;
    text-align: center;
    .navigationItem {
      background-color: #181818;
      flex: 1;
      padding: 5px 0;
      position: relative;
      &.selected p {
        color: $mainColor;
      }
      .imgWrap {
        width: pxToRem(45px);
        height: pxToRem(45px);
        margin: 0 auto 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: $fs24;
        color: #fff;
      }
      .mint-badge {
        position: absolute;
        top: 3px;
        right: pxToRem(25px);
      }
    }
  }
}
</style>
