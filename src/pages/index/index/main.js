import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // enablePullDownRefresh: true,
    // onReachBottomDistance: 100,
    navigationBarTitleText: '心远的个人简历'
  }
}
