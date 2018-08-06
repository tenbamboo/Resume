import SparkMD5 from 'spark-md5'
import wx from 'weixin-js-sdk'
/**
 * @todo Cain工具包
 * @namespace Cain
 * @author haze.liu
 * @since 2017-10-12
 */
export default {
  $http: {}, //
  /**
   * @public
   * @function
   * @todo 获取Url中的值，如果没有再从localstorage,sessionstorage依次获取值
   * @memberof Cain
   * @param {String} name key的名字
   */
  getParam (name) {
    return this.getUrlParam(name) || localStorage.getItem(name) || sessionStorage.getItem(name)
  },
  /**
  * @public
  * @function
  * @todo 获取Url中的值
  * @memberof Cain
  * @param {String} name key的名字
  */
  getUrlParam: function (name) {
    if (this.isBlank(name)) {
      var url = decodeURI(location.search) // 获取url中"?"符后的字串
      var theRequest = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    } else {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURI(r[2])
      }
    }
    return null
  },
  /**
       * @public
       * @function
       * @todo 对字符日期进行转换
       * @memberof Cain
       * @param {String} date 式字符串
       */
  conversionDate (date) {
    if (this.isBlank(date)) {
      return false
    }

    if (date.substring(0, date.lastIndexOf('.')) !== '') {
      date = date.substring(0, date.lastIndexOf('.'))
    }
    date = date.replace(/-/g, '/')
    return new Date(date)
  },
  /**
       * @public
       * @function
       * @todo 对日期进行格式化
       * @memberof Cain
       * @param {Date} date 要格式化的日期
       * @param {String} format 进行格式化的模式字符串
       *     支持的模式字母有：
       *     y:年,
       *     M:年中的月份(1-12),
       *     d:月份中的天(1-31),
       *     h:小时(0-23),
       *     m:分(0-59),
       *     s:秒(0-59),
       *     S:毫秒(0-999),
       *     q:季度(1-4)
       */
  formatDate: function (date, format) {
    if (this.isBlank(date)) {
      date = new Date()
    }
    if (this.isBlank(format)) {
      format = 'yyyy-MM-dd hh:mm:ss'
    }

    if (typeof date === 'string') {
      if (date.substring(0, date.lastIndexOf('.')) !== '') {
        date = date.substring(0, date.lastIndexOf('.'))
      }
      date = date.replace(/-/g, '/')
    }

    date = new Date(date)
    var map = {
      M: date.getMonth() + 1, // 月份
      d: date.getDate(), // 日
      h: date.getHours(), // 小时
      m: date.getMinutes(), // 分
      s: date.getSeconds(), // 秒
      q: Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
      var v = map[t]
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v
          v = v.substr(v.length - 2)
        }

        return v
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length)
      }

      return all
    })

    return format
  },
  /**
  * @public
  * @function
  * @todo  用于搜索时间中,替换时分秒成0:0:0使用
  * @memberof Cain
  * @param {String} date
  */
  setStartTime: function (date) {
    var a = null
    if (!this.isBlank(date)) {
      a = new Date(date)
    } else {
      a = new Date()
    }
    a.setHours(0)
    a.setMinutes(0)
    a.setSeconds(0)
    return this.formatDate(a.getTime(), 'yyyy-MM-dd hh:mm:ss')
  },
  /**
   * @public
   * @function
   * @todo  用于搜索时间中,替换时分秒成23:59:59使用
   * @memberof Cain
   * @param {String} date
   */
  setEndTime: function (date) {
    var a = null
    if (!this.isBlank(date)) {
      a = new Date(date)
    } else {
      a = new Date()
    }
    a.setHours(23)
    a.setMinutes(59)
    a.setSeconds(59)
    return this.formatDate(a.getTime(), 'yyyy-MM-dd hh:mm:ss')
  },
  /**
       * @public
       * @function
       * @todo 判断是否为空
       * @memberof Cain
       * @param {Object} obj 需要校验对象
       */
  isBlank: function (obj) {
    if (typeof obj === 'undefined' || obj === undefined || obj == null || obj === 'null' || (obj + '') === 'NaN' || obj === 'undefined' || obj === '' || obj.length === 0) {
      return true
    } else if (typeof obj === 'object' && obj.length === undefined) {
      for (var name in obj) {
        return false
      }
      return true
    } else {
      return false
    }
  },
  /**
       * @function getUUID
       * @memberof Cain
       * @public
       * @todo 生成UUID
       */
  getUUID: function () {
    this.getUUID.random4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (this.getUUID.random4() + this.getUUID.random4() + '-' + this.getUUID.random4() + '-' + this.getUUID.random4() + '-' + this.getUUID.random4() + '-' + this.getUUID.random4() + this.getUUID.random4() + this.getUUID.random4())
  },
  /**
       * @public
       * @function
       * @todo 生日转换为年龄
       * @memberof Cain
       * @param {String} birthday 日期格式为"2000-01-01"
       */
  brithdayConAges: function (strBirthday) {
    if (!strBirthday) {
      return 0
    }
    strBirthday = this.formatDate(strBirthday, 'yyyy-MM-dd')

    var returnAge
    var strBirthdayArr = strBirthday.split('-')
    var birthYear = strBirthdayArr[0]
    var birthMonth = strBirthdayArr[1]
    var birthDay = strBirthdayArr[2]
    var d = new Date()
    var nowYear = d.getFullYear()
    var nowMonth = d.getMonth() + 1
    var nowDay = d.getDate()

    if (nowYear === birthYear) {
      returnAge = 0 // 同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear // 年之差
      if (ageDiff > 0) {
        if (nowMonth === birthMonth) {
          var dayDiff = nowDay - birthDay // 日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        } else {
          var monthDiff = nowMonth - birthMonth // 月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        }
      } else {
        returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
      }
    }

    return returnAge // 返回周岁年龄
  },
  // 获取文件信息内容
  getFileInfo (file) {
    var uri = {
      url: '',
      fileName: '',
      fileType: '',
      data: ''
    }

    try {
      if (window.URL.createObjectURL) {
        // if (fileItems.length > 0) {
        var u = file
        uri.data = u
        uri.url = window.URL.createObjectURL(u)
        uri.fileName = u.name || ''
        // }
      }
      var index = uri.fileName.lastIndexOf('.')
      if (index !== -1) {
        uri.fileType = uri.fileName.substring(index + 1).toLowerCase()
        uri.fileName = uri.fileName.split('.')[0].toLowerCase()
      }
      return uri
    } catch (e) {
      throw e
    }
  },
  // 获取文件MD5
  getFileMD5Info (ofile) {
    return new Promise((resolve, reject) => {
      let file = ofile
      let tmpMd5 = ''
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      let chunkSize = 8097152 // Read in chunks of 2MB
      let chunks = Math.ceil(file.size / chunkSize)
      let currentChunk = 0
      let spark = new SparkMD5.ArrayBuffer()
      let fileReader = new FileReader()

      fileReader.onload = function (e) {
        spark.append(e.target.result) // Append array buffer
        currentChunk++
        if (currentChunk < chunks) {
          loadNext()
        } else {
          tmpMd5 = spark.end()
          resolve(tmpMd5 + file.size)
        }
      }

      fileReader.onerror = function () {
        reject(new Error('MD5错误了'))
      }

      function loadNext () {
        var start = currentChunk * chunkSize
        var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
      loadNext()
    })
  },
  /**
 * @public
 * @function
 * @todo  通过base64提交图片信息
 * @memberof Cain
 * @param {String} base64 需要上传的文件String
 */
  fileUploadByBase64 (base64, $httpFile) {
    let formdata = new FormData()
    formdata.append('files', base64)
    return $httpFile.post('file/uploadFileByBase64', {
      files: [base64]
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  /**
 * @public
 * @function
 * @todo  提交图片信息
 * @memberof Cain
 * @param {FileList} fileList 需要上传的文件对象List
 * @param {AxiosObject} $httpFile 对应axios请求对象，需要['Content-Type'] = 'multipart/form-data'
 */
  fileUpload (fileList, $httpFile) {
    return new Promise(async (resolve, reject) => {
      let md5List = [] // 最后上传文件对应的md5

      // 获取没有fileCode的数据（新增数据）,进行md5校验
      for (let i in fileList) {
        if (this.isBlank(fileList[i].fileCode) && !this.isBlank(fileList[i].data)) {
          let md5 = await this.getFileMD5Info(fileList[i].data)
          fileList[i].fileCode = md5
        }
      }
      // 校验文件 是否存在
      const valFile = await $httpFile.post(
        'file/getFile', {
          fileList: fileList
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      // 开始上传文件
      let formdata = new FormData()
      for (let i in valFile.data) {
        fileList[i].errorCode = valFile.data[i].errorCode
        if (valFile.data[i].errorCode === '10003') {
          // 如果返回的code为10003时则代表需要上传数据
          formdata.append('files', fileList[i].data)
          md5List.push(fileList[i].fileCode)
        } else if (valFile.data[i].errorCode === '0') {
          // code为0 代表无需上传，服务器已有资源
          fileList[i].sourceUrl = valFile.data[i].fileUrl
        } else if (valFile.data[i].errorCode === '10004') {
          // code为10004 代表此数据无fileCode（md5值），此时啥也不干
        }
      }
      if (!this.isBlank(md5List)) {
        formdata.append('fileCode', md5List)
        const res = await $httpFile.post('file/uploadFile', formdata)

        for (let item of res.data) {
          let targerObj = fileList.find(c => {
            return c.fileCode === item.fileCode
          })
          if (!this.isBlank(targerObj)) {
            targerObj.sourceUrl = item.fileUrl
          }
        }
      }
      resolve(fileList)
    })
  },
  /**
   * @function getRowID
   * @memberof Cain
   * @public
   * @todo 生成Oracle RowID
   */
  getRowID: function () {
    return this.getUUID().replace(new RegExp('-', 'gm'), '')
  },
  /**
   * @public
   * @function
   * @todo  DB用时间戳
   * @memberof Cain
   * @param {String} date
   */
  getOperTime: function (date) {
    if (this.isBlank(date)) {
      return new Date().getTime() / 1000
    } else {
      if (date.substring(0, date.lastIndexOf('.')) !== '') {
        date = date.substring(0, date.lastIndexOf('.'))
      }
      date = date.replace(/-/g, '/')
    }
    return new Date(date).getTime() / 1000
  },
  //   /**
  // * @public
  // * @function
  // * @todo  初始化Code工具
  // * @memberof Cain
  // * @param {Object} http this.$http容器
  // */
  //   initHttp (http) {
  //     this.$http = http
  //   },
  //   /**
  // * @public
  // * @function
  // * @todo  获取字典表信息
  // * @memberof Cain
  // * @param {String} code 字典值
  // */
  //   getCode (code) {
  //     return new Promise(async (resolve, reject) => {
  //       let codeList = this.getParam('rootCodeList' + code)
  //       if (this.isBlank(codeList)) {
  //         const res = await this.$http.post('interface/getCode', { cdClass: code })
  //         codeList = res.result
  //         sessionStorage.setItem('rootCodeList' + code, JSON.stringify(codeList))
  //       } else {
  //         codeList = JSON.parse(codeList)
  //       }
  //       resolve(codeList)
  //     })
  //   },
  //   /**
  //   * @public
  //   * @function
  //   * @todo 通过openId获取用户信息（一次，不存储到SessionStorage）
  //   * @memberof Cain
  //   * @param {String} openId 如果有值就不从sessionStorage中取了
  //   */
  //   getUserInfoByOnce: function (userId) {
  //     return this.getUserInfo({
  //       isNotSave: true,
  //       isRefersh: false,
  //       userId: userId

  //     })
  //   },
  //   /**
  // * @public
  // * @function
  // * @todo 通过openId获取用户信息（存储并刷新SessionStorage）-- 一般用于JSP页面
  // * @memberof Cain
  // * @param {String} openId 如果有值就不从sessionStorage中取了
  // */
  //   getUserInfoByRefersh: function () {
  //     return this.getUserInfo({
  //       isNotSave: false,
  //       isRefersh: true

  //     })
  //   },
  //   /**
  // * @public
  // * @function
  // * @todo 通过openId获取用户信息
  // * @memberof Cain
  // * @param {Boolean} isNotSave 是否关闭向Session中获取和存储
  // * @param {Boolean} isRefersh 是否刷新sessionStorage
  // * @param {String} openId 如果有值就不从sessionStorage中取了
  // */
  //   async getUserInfo (param) {
  //     param = param || {}
  //     var userId = param.userId || this.getParam('openId')
  //     var flag = param.isNotSave || false
  //     var isRefersh = param.isRefersh || false
  //     var user = {}

  //     if (isRefersh) {
  //       user = await this._getUserInfo(userId, flag)
  //     } else if (!flag && sessionStorage.getItem('userInfo')) {
  //       user = JSON.parse(sessionStorage.getItem('userInfo'))
  //     } else {
  //       user = await this._getUserInfo(userId, flag)
  //     }

  //     return user
  //   },
  //   /**
  // * @private
  // * @function
  // * @todo 通过openId获取用户信息私有
  // * @memberof Cain
  // * @param {Boolean} userId 用户ID
  // * @param {Boolean} isRefersh 是否刷新sessionStorage
  // */
  //   _getUserInfo (userId, isNotSave) {
  //     return new Promise(async (resolve, reject) => {
  //       let user = await this.$http.post('/interface/getUserInfo', { userId: userId })
  //       user = user.result[0]
  //       if (!isNotSave) {
  //         sessionStorage.setItem('userInfo', JSON.stringify(user))
  //       }
  //       resolve(user)
  //     })
  //   },
  getUserInfo () {
    return JSON.parse(sessionStorage.getItem('rootUserInfo'))
  },
  /**
   * @public
   * @function
   * @todo  初始化WX
   * @memberof Cain
   * @param {Object} httpWX 请求实例
   */
  getWeChatToken (httpWX) {
    return new Promise(async (resolve, reject) => {
      let p = {}
      p.u = location.origin + location.pathname
      p.j = '"chooseImage","uploadImage","scanQRCode","openLocation","onMenuShareAppMessage","onMenuShareTimeline","closeWindow"'
      // 'checkJsApi', 'previewImage', 'closeWindow', 'scanQRCode', 'previewImage', 'onMenuShareAppMessage', 'chooseWXPay', 'addCard', 'chooseCard', 'openCard'
      const res = await httpWX.post('wxsr/getWXJSConfig', p)
      let qqx = JSON.parse(res.data)
      qqx.debug = false
      wx.config(qqx)
      wx.ready(() => {
        resolve()
      })
      wx.error(() => {
        reject(new Error('wxJSAPI Error!!!!!!'))
      })
    })
  },
  /**
  * @public
  * @function
  * @todo  分享
  * @memberof Cain
  * @param {Object} param
  * @param {String} param.title 分享标题
  * @param {String} param.desc 分享描述
  * @param {String} param.icon 分享Icon
  * @param {String} param.link 分享link
  */
  shareFormWeChat (param) {
    return new Promise(async (resolve, reject) => {
      if (this.isBlank(param)) {
        param = {}
      }
      let shareTitle = param.title || '臻爱糖友社区'
      let shareDesc = param.desc || document.title
      if (shareDesc != null) {
        shareDesc = shareDesc.substring(0, 80)
      }

      let ctx = window.location.protocol + '//' + window.location.host
      let shareImage = param.icon || ctx + '/dcn/static/img/logo_share.jpg'
      let shareLink = param.link || location.href

      // 添加openid参数
      if (shareLink != null && shareLink.indexOf('?') > 0) {
        shareLink += '&'
      } else {
        shareLink += '?'
      }

      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImage, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          resolve()
        },
        cancel: function () {
          reject(new Error('用户取消'))
        }
      })
      wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: shareLink, // 分享链接
        imgUrl: shareImage, // 分享图标
        success: function () {
          resolve()
        },
        cancel: function () {
          reject(new Error('用户取消'))
        }
      })
    })
  },
  //   /**
  // * @public
  // * @function
  // * @todo 获取微信Token信息
  // * @memberof Cain
  // * @return  promise对象
  // */
  //   getWeChatToken: function ($http) {
  //     return new Promise(async (resolve, reject) => {
  //       var l = ['checkJsApi', 'previewImage', 'closeWindow', 'scanQRCode', 'previewImage', 'onMenuShareAppMessage', 'chooseWXPay', 'addCard', 'chooseCard', 'openCard']
  //       //    l.splice(0, 0, 'checkJsApi');
  //       let wechatNo = process.env.weChatNo
  //       const res = await $http.post('/getJsSdkConfigParam.do', {
  //         url: location.href.split('#')[0],
  //         wechatNo,
  //         type: 'jsapi'
  //       })
  //       const msg = res.data
  //       wx.config({
  //         debug: false,
  //         appId: msg.appid,
  //         timestamp: msg.timestamp,
  //         nonceStr: msg.nonceStr,
  //         signature: msg.signature,
  //         jsApiList: l
  //       })
  //       wx.ready(function () {
  //         resolve(msg)
  //       })
  //     })
  //   },
  /**
* @public
* @function
* @todo 预览图片
* @memberof Cain
* @return  promise对象
*/
  preview (current, urls) {
    if (this.isBlank(urls)) {
      urls = [current]
    }
    wx.previewImage({
      current: current,
      urls: urls
    })
  },
  /**
* @public
* @function
* @todo 获取经纬度信息
* @memberof Cain
* @return  promise对象
*/
  getLocation () {
    return new Promise(async (resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          resolve({
            latitude,
            longitude
          })
        }
      })
    })
  },
  /**
* @public
* @function
* @todo 获取两点之间的距离
* @memberof Cain
* @return  公里数
*/
  getFlatternDistance (lat1, lng1, lat2, lng2) {
    lat1 = +lat1
    lat2 = +lat2
    lng1 = +lng1
    lng2 = +lng2
    var PI = Math.PI
    var EARTH_RADIUS = 6378137.0
    function getRad (d) {
      return d * PI / 180.0
    }
    // var PI = Math.PI
    var f = getRad((lat1 + lat2) / 2)
    var g = getRad((lat1 - lat2) / 2)
    var l = getRad((lng1 - lng2) / 2)

    var sg = Math.sin(g)
    var sl = Math.sin(l)
    var sf = Math.sin(f)

    var s, c, w, r, d, h1, h2
    var a = EARTH_RADIUS
    var fl = 1 / 298.257

    sg = sg * sg
    sl = sl * sl
    sf = sf * sf

    s = sg * (1 - sl) + (1 - sf) * sl
    c = (1 - sg) * (1 - sl) + sf * sl

    w = Math.atan(Math.sqrt(s / c))
    r = Math.sqrt(s * c) / w
    d = 2 * w * a
    h1 = (3 * r - 1) / 2 / c
    h2 = (3 * r + 1) / 2 / s
    let m = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
    return (m / 1000).toFixed(1)
  },
  /**
* @public
* @function
* @todo 微信支付
* @memberof Cain
* @return  promise对象
*/
  wxPay ($http, payMoney) {
    return new Promise(async (resolve, reject) => {
      let weChatNo = process.env.weChatNo
      var p = {
        openId: this.getParam('openId'),
        orderId: this.getRowID(),
        body: '红娘支付',
        totalFee: payMoney,
        fee: ((+payMoney) * 100).toFixed(2),
        payTime: this.getOperTime()
      }
      const res = await $http.post(`wechatApi.do?apiType=pay&wechatNo=${weChatNo}`, p)
      let data = res.data

      if (parseInt(data.agent) < 5) {
        reject(new Error('您的微信版本版本过低,请下载最新微信'))
        return false
      }
      if (!this.isBlank(data.returnMsg)) {
        reject(new Error(data.returnMsg))
        return false
      }
      /* eslint-disable */
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
        'appId': data.appId,
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.packageValue,
        'signType': data.signType,
        'paySign': data.paySign
      },
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            resolve()
          } else {
            reject(new Error(res.err_msg))
          }
        })
      /* eslint-enable */
    })
  },

  /**
   * @public
   * @function
   * @todo  获取滚动高度
   * @memberof Cain
   */
  getScroll () {
    return (document.documentElement.scrollTop || 0) + (document.body.scrollTop || 0)
  },
  /**
   * @public
   * @function
   * @todo  滚动到某一个位置
   * @memberof Cain
   */
  scrollTo (val = 0) {
    document.documentElement.scrollTop = val
    document.body.scrollTop = val
  },
  /**
   * @public
   * @function
   * @todo  获取cookie信息
   * @memberof Cain
   */
  getCookie (key) {
    var strcookie = document.cookie
    var arrcookie = strcookie.split('; ')
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split('=')
      if (arr[0] === key) return decodeURIComponent(arr[1]) // 增加对特殊字符的解析
    }
    return ''
  }

}
