
//app.js
App({
  onLaunch: function () {



    wx.request({
      url: 'https://tenbamboo.github.io/Gabriel/js/index.js',
      success:function(data){
      console.log(data)
      }
    })
 
  },
  globalData: {
    userInfo: null
  }
})