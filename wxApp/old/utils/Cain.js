let Cain = {
  //设置剪切板内容
  setClipboard(content) {
    wx.setClipboardData({
      data: content,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //打电话
  callPhone(mobilePhone) {
    wx.makePhoneCall({
      phoneNumber: mobilePhone
    })
  }

}

module.exports = Cain
