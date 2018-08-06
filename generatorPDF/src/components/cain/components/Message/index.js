const CainMessage = {
  // 显示Toast
  confirm (message, succesTxt = '确认', cancelTxt = '再看看') {
    return new Promise((resolve, reject) => {
      weui.confirm(message, {
        buttons: [{
          label: cancelTxt,
          type: 'default',
          onClick: function () { reject(new Error('cancel')) }
        }, {
          label: succesTxt,
          type: 'primary',
          onClick: function () { resolve() }
        }]
      })
    })
  },
  alert (message, succesTxt = '确认') {
    return new Promise((resolve, reject) => {
      weui.alert(message, {
        buttons: [{
          label: succesTxt,
          type: 'primary',
          onClick: function () { resolve() }
        }]
      })
    })
  }
}
export default CainMessage
