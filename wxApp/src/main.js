import Vue from 'vue'
import App from './App'
// import Router from './components/cain/cain.router'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

// let page = [
//   {
//     component: '/pages/index/index/main',
//     url: 'index'
//   },

// ]
// Router.formatePagesToMpVue(page)

export default {
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/index/main'
    ],
    window: {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#303538',
      'navigationBarTitleText': '心远个人简历',
      'navigationBarTextStyle': 'white'
    }
    // tabBar: {
    //   color: '#000000',
    //   selectedColor: '#ff7e33',
    //   list: [{
    //     iconPath: 'static/image/navBar/index.png',
    //     selectedIconPath: 'static/image/navBar/indexS.png',
    //     pagePath: 'pages/index/index/main',
    //     text: '首页'
    //   }, {
    //     iconPath: 'static/image/navBar/geo.png',
    //     selectedIconPath: 'static/image/navBar/geoS.png',
    //     pagePath: 'pages/map/index/main',
    //     text: '附近'
    //   }, {
    //     iconPath: 'static/image/navBar/eshop.png',
    //     selectedIconPath: 'static/image/navBar/eshopS.png',
    //     pagePath: 'pages/eshop/index/main',
    //     text: '商城'
    //   }, {
    //     iconPath: 'static/image/navBar/my.png',
    //     selectedIconPath: 'static/image/navBar/myS.png',
    //     pagePath: 'pages/my/index/main',
    //     text: '我的'
    //   }]
    // }
  }
}
