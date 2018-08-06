// import { Toast } from 'vant'
const CainToast = {
  // 显示Toast
  toast (msg) {
    // Toast(msg)
    weui.toast(msg, 3000)
  },
  // 显示成功Toast
  success (msg) {
    // Toast.success(msg)
    // this.toast(msg, 'fa fa-check')
  },
  // 显示错误Toast
  error (msg) {
    // Toast.fail(msg)
  },
  // 显示警告Toast
  warn (msg) {
    // Toast.fail(msg)
    // this.toast(msg, 'fa fa-exclamation-triangle')
  }
}
export default CainToast
