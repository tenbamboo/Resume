import Cain from '../../utils/Cain.js'
import LocalData from '../../utils/LocalData.js'

Page({
  data: {},
  onReady: function (e) {
    this.setData(LocalData)
  },
  //打开/关闭手风琴项
  toggleAccordionItem(e) {
    let item = this.data.workList[e.currentTarget.dataset.index];

    item.isShow = !item.isShow

    this.setData({
      workList: this.data.workList
    })
  },

  //设置剪切板内容
  setClipboard(e) {
    Cain.setClipboard(e.currentTarget.dataset.content)
  },
  //打电话
  callPhone() {
    Cain.callPhone(this.data.baseInfo.mobilePhone)
  }
 
 

})