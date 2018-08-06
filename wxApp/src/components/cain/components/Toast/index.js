import { Toast } from 'mint-ui'
const CainToast = {
  // 显示Toast
  toast (msg, icons) {
    Toast({
      message: msg,
      iconClass: icons
    })
  },
  // 显示成功Toast
  success (msg) {
    this.toast(msg, 'fa fa-check')
  },
  // 显示错误Toast
  error (msg) {
    this.toast(msg, 'fa fa-times')
  },
  // 显示警告Toast
  warn (msg) {
    this.toast(msg, 'fa fa-exclamation-triangle')
  }
}
export default CainToast
