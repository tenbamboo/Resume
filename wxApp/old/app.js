
//app.js
App({
  onLaunch: function () {

    wx.showLoading({
      title: "加载中",
      mask: true
    })

   
 
  },
  globalData: {
    userInfo: null
  }
})