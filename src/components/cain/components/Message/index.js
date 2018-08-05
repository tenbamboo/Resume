import { MessageBox } from 'mint-ui'
const CainMessage = {
  // 显示Toast
  confirm (msg, succesTxt = '确认', cancelTxt = '再看看') {
    return new Promise((resolve, reject) => {
      MessageBox({
        message: msg,
        showCancelButton: true,
        confirmButtonText: succesTxt,
        cancelButtonText: cancelTxt
      }).then(action => {
        if (action === 'confirm') {
          resolve()
        } else {
          reject(new Error('cancel'))
        }
      })
    })
  }
}
export default CainMessage
