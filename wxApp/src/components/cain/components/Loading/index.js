import { Indicator } from 'mint-ui'
const CainLoading = {
  // 显示Toast
  show (msg = '加载中...', icons = 'fading-circle') {
    Indicator.open({
      text: msg,
      spinnerType: icons
    })
  },
  close () {
    Indicator.close()
  }
}
export default CainLoading
