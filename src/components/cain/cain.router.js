let router = {
  storageKey: 'cainRouter',
  // 通过映射值查找对应的数据
  getPageInfo (value) {
    let url = value.split('?')[0]
    let list = wx.getStorageSync(this.storageKey)
    let res = list.find((item) => {
      if (item.url === url) {
        return item
      }
    })
    if (res) {
      return res
    }
    return false
  },
  // 把参数格式化成MpVue能用的参数
  formatePagesToMpVue (list) {
    // return new Promise((resolve, reject) => {
    let pages = []
    let startPageFlag = false
    for (let item of list) {
      if (item.startPage) {
        // 判断是否有多个，如果有多个直接提示出来
        if (startPageFlag) {
          let error = '入口页设置了多个，请查看，并修改为一个！！'
          console.warn(error)
          // reject(new Error(error))
          return {}
        }
        startPageFlag = true
        pages.push('^' + item.component)
      } else {
        pages.push(item.component)
      }
    }
    // 最后判断是否设置入口页
    // if (!startPageFlag) {
    //     let error = '未设置入口页！！'
    //     console.error(error)
    //     // reject(new Error(error))
    //     return {}
    // }

    wx.setStorageSync('cainRouter', list)
    return pages
    // resolve(pages)
    // })
  }

}
export default router
