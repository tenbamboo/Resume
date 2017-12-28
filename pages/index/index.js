import Cain from '../../utils/Cain.js'
// 本地方式
// import LocalData from '../../utils/LocalData.js'

Page({
  data: {},
  onReady: function (e) {
    this.getData()
  },
  //获取数据
  getData(){
    // 本地方式
   // this.setData(LocalData)

   //远程方式
   const self = this;
    wx.request({
      url:'https://health.ztlife.com.cn/UnionWeChat/json/haze.liu.json',
      success:function(data){
        self.setData(data.data)
      }
    });
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