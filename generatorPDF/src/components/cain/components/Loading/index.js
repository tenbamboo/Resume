const CainLoading = {
  // 显示Toast
  show (message = '加载中...') {
    window.weuiLoading = weui.loading(message)
  },
  close () {
    window.weuiLoading.hide()
  }
}
export default CainLoading
