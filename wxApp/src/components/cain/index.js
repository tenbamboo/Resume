import CainValidator from '@cain/cain.validator'
import CainRouter from '@cain/cain.router'
/**
 * @todo Cain工具包
 * @namespace Cain
 * @author haze.liu
 * @since 2017-10-12
 */
export default {
  /**
       * @public
       * @function
       * @todo 同VUeRouter.push方法
       * @memberof Cain
       * @param {String} param 跳转的路由String 二选一
       * @param {Object} param 跳转的路由object 二选一
       * @param {String} param.url 跳转的路由
       * @param {Object} param.query 传递的参数
       * @param {Boolean} param.autoAppend 是否自动补全信息（直接再路径中补全/main） 默认为true
       */
  navigateTo (param) {
    let url = ''
    let res = ''

    if (typeof param === 'string') {
      // url = param + '/main'
      res = CainRouter.getPageInfo(param)
      if (!res) {
        console.error('未找到路径映射')
        return false
      }
      url = res.component
    } else if (typeof param === 'object') {
      url = param.url

      // if (this.isBlank(param.autoAppend) || param.autoAppend === true) {
      //   url += '/main'
      // }
      res = CainRouter.getPageInfo(url)
      if (!res) {
        console.error('未找到路径映射')
        return false
      }
      url = res.component
      url += this.stringifyQuery(param.query)
    }

    wx.navigateTo({ url })
  },
  /**
           * @public
           * @function
           * @todo 同VUeRouter.replace方法
           * @memberof Cain
           * @param {String} param 跳转的路由String 二选一
           * @param {Object} param 跳转的路由object 二选一
           * @param {String} param.url 跳转的路由
           * @param {Object} param.query 传递的参数
           * @param {Object} param.autoAppend 是否自动补全信息（直接再路径中补全/main） 默认为true
           */
  redirectTo (param) {
    let url = ''
    let res = ''
    if (typeof param === 'string') {
      // url = param + '/main'
      res = CainRouter.getPageInfo(param)
      if (!res) {
        console.error('未找到路径映射')
        return false
      }
    } else if (typeof param === 'object') {
      url = param.url

      // if (this.isBlank(param.autoAppend) || param.autoAppend === true) {
      //   url += '/main'
      // }
      res = CainRouter.getPageInfo(url)
      if (!res) {
        console.error('未找到路径映射')
        return false
      }
      url = res.component
      url += this.stringifyQuery(param.query)
    }
    wx.redirectTo({ url })
  },
  /**
           * @public
           * @function
           * @todo 同VUeRouter.replace方法
           * @memberof Cain
           * @param {String} param 跳转的路由String 二选一
           * @param {Object} param 跳转的路由object 二选一
           * @param {String} param.url 跳转的路由
           * @param {Object} param.query 传递的参数
           * @param {Object} param.autoAppend 是否自动补全信息（直接再路径中补全/main） 默认为true
           */
  switchTab (param) {
    let url = ''
    let res = ''
    if (typeof param === 'string') {
      // url = param + '/main'
      res = CainRouter.getPageInfo(param)
      if (!res) {
        console.error('未找到路径映射')
        return false
      }
    } else if (typeof param === 'object') {
      url = param.url

      // if (this.isBlank(param.autoAppend) || param.autoAppend === true) {
      //   url += '/main'
      // }
      res = CainRouter.getPageInfo(url)
      if (!res) {
        console.error('未找到路径映射')
        return false
      }
      url = res.component
      url += this.stringifyQuery(param.query)
    }
    wx.switchTab({ url })
  },
  /**
           * @public
           * @function
           * @todo 路由后退 For wx
           * @memberof Cain
           * @param {Object} obj 参数
           */
  navigateBack (param = {}) {
    wx.navigateBack(param)
  },
  /**
           * @public
           * @function
           * @todo Json转url参数
           * @memberof Cain
           * @param {Object} obj 参数
           */
  stringifyQuery (obj) {
    const res = obj ? Object.keys(obj).map(key => {
      const val = obj[key]

      if (val === undefined) {
        return ''
      }

      if (val === null) {
        return (key)
      }

      if (Array.isArray(val)) {
        const result = []
        val.forEach(val2 => {
          if (val2 === undefined) {
            return
          }
          if (val2 === null) {
            result.push((key))
          } else {
            result.push((key) + '=' + (val2))
          }
        })
        return result.join('&')
      }

      return (key) + '=' + (val)
    }).filter(x => x.length > 0).join('&') : null
    return res ? `?${res}` : ''
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
      a = this.conversionDate(date)
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
      a = this.conversionDate(date)
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
    if (typeof obj === 'undefined' || obj === undefined || obj == null || obj === 'null' || obj === 'undefined' || obj === '' || obj.length === 0) {
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
           * @public
           * @function
           * @todo 判断是否为空，并提示出来
           * @memberof Cain
           * @param {String} value 需要校验对象
           * @param {String} errorMsg 错误信息
           * @param {String} type 类型，alert，toast
           */
  _isBlankAction (value, errorMsg, type = 'toast') {
    return new Promise((resolve, reject) => {
      if (this.isBlank(value)) {
        if (type === 'toast') {
          this.showToastE(errorMsg)
        } else if (type === 'alert') {
          this.showAlert(errorMsg)
        }
        reject(new Error('空'))
        return false
      }
      resolve()
    })
  },
  /**
           * @public
           * @function
           * @todo 判断是否为空，并提示出来 Toast
           * @memberof Cain
           * @param {String} value 需要校验对象
           * @param {String} errorMsg 错误信息
           */
  isBlankToast (value, errorMsg) {
    return this._isBlankAction(value, errorMsg, 'toast')
  },
  /**
           * @public
           * @function
           * @todo 判断是否为空，并提示出来 ALert
           * @memberof Cain
           * @param {String} value 需要校验对象
           * @param {String} errorMsg 错误信息
           */
  isBlankAlert (value, errorMsg) {
    return this._isBlankAction(value, errorMsg, 'alert')
  },
  /**
           * @public
           * @function
           * @todo 判断一个值是否匹配对应的模型，并提示出来
           * @memberof Cain
           * @param {String} value 需要校验对象
           * @param {String} model 模型，请参考cain.validator
           * @param {String} errorMsg 错误信息
           */
  validatorAction (value, model, errorMsg, type) {
    return new Promise((resolve, reject) => {
      if (!CainValidator.v(value, model)) {
        if (type === 'toast') {
          this.showToastE(errorMsg)
        } else if (type === 'alert') {
          this.showAlert(errorMsg)
        }
        reject(new Error('未通过校验'))
        return false
      }
      resolve()
    })
  },
  /**
           * @public
           * @function
           * @todo 判断一个值是否匹配对应的模型，并提示出来 Toast
           * @memberof Cain
           * @param {String} value 需要校验对象
           * @param {String} model 模型，请参考cain.validator
           * @param {String} errorMsg 错误信息
           */
  validatorToast (value, model, errorMsg) {
    return this.validatorAction(value, model, errorMsg, 'toast')
  },
  /**
           * @public
           * @function
           * @todo 判断一个值是否匹配对应的模型，并提示出来 ALert
           * @memberof Cain
           * @param {String} value 需要校验对象
           * @param {String} model 模型，请参考cain.validator
           * @param {String} errorMsg 错误信息
           */
  validatorAlert (value, model, errorMsg) {
    return this.validatorAction(value, model, errorMsg, 'alert')
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
  /**
   * @public
   * @function
   * @todo  获取人民币（分转元）
   * @memberof Cain
   * @param {String} date
   */
  getRMB (fen) {
    if (this.isBlank(fen)) {
      return '0.00'
    }
    return (+fen / 100).toFixed(2)
  },
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
  // /**
  // * @public
  // * @function
  // * @todo 通过openId获取用户信息（一次，不存储到SessionStorage）
  // * @memberof Cain
  // * @param {String} openId 如果有值就不从sessionStorage中取了
  // */
  // getUserInfoByOnce: function (userId) {
  //   return this.getUserInfo({
  //     isNotSave: true,
  //     isRefersh: false,
  //     userId: userId

  //   })
  // },
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
  // * @public
  // * @function
  // * @todo 获取用户信息信息
  // * @memberof Cain
  // */
  //   getUserStar (userInfo) {
  //     return new Promise(async (resolve, reject) => {
  //       let userHead = userInfo.authUserHead === '1'
  //       let realPerson = userInfo.authRealPerson === '1'
  //       let livePhoto = false
  //       if (!this.isBlank(userInfo.livePhoto)) {
  //         if (Array.isArray(userInfo.livePhoto)) {
  //           livePhoto = userInfo.livePhoto.length >= 5
  //         } else {
  //           livePhoto = userInfo.livePhoto.split(',').length >= 5
  //         }
  //       }
  //       let info90 = false
  //       // 校验基础数据90%
  //       let key = [
  //         'nickName', 'birthday', 'height', 'edu', 'income', 'marry',
  //         'area', 'weight', 'house', 'car', 'job',
  //         'howLongMarry', 'constellation', 'bloodType', 'shape', 'oneChild',
  //         'overseas', 'exoticLove', 'life', 'smoke', 'drink',
  //         'religion', 'pet', 'exercise', 'wantChild', 'wantParent'
  //       ]
  //       let count = 0

  //       for (let p in userInfo) {
  //         let temp = key.find(item => {
  //           return p === item
  //         })
  //         if (!this.isBlank(temp) && !this.isBlank(userInfo[p])) {
  //           count++
  //         }
  //       }
  //       let infoValue = ((count / key.length) * 100).toFixed(1) + '%'

  //       if (count >= (key.length * 0.9)) {
  //         info90 = true
  //       }

  //       // 校验其他数据
  //       let otherFlag = false
  //       let otherCount = 0
  //       if (userInfo.authCar === '1') {
  //         otherCount++
  //       }
  //       if (userInfo.authHouse === '1') {
  //         otherCount++
  //       }
  //       if (userInfo.authEdu === '1') {
  //         otherCount++
  //       }
  //       if (!this.isBlank(userInfo.vipStartTime) || !this.isBlank(userInfo.svipStartTime)) {
  //         otherCount++
  //       }

  //       if (otherCount >= 2) {
  //         otherFlag = true
  //       }

  //       resolve({
  //         userHead, // 头像审核星
  //         realPerson, // 实名审核星
  //         livePhoto, // 5张生活照星
  //         info90, // 信息完成90%星
  //         infoValue, // 信息完成度
  //         otherFlag // 其他完善星
  //       })
  //     })
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
       * @todo 同axios.post方法 For wx 微信服务器请求
       * @memberof Cain
       * @param {Object} param 参数
       * @param {String} url 请求的url
       */
  postForWx (url, data = {}) {
    return new Promise(async (resolve, reject) => {
      // let header = {
      //   'content-type': 'application/x-www-form-urlencoded'
      // }
      console.log('req:' + url, data)
      wx.request({
        url: process.env.wxServicePath + url,
        data,
        // header,
        method: 'post',
        success (res) {
          console.log('res:' + url, res)
          resolve(res.data)
        },
        fail (data) {
          reject(data)
        }
      })
    })
  },
  /**
       * @public
       * @function
       * @todo 同axios.post方法 For wx
       * @memberof Cain
       * @param {Object} param 参数
       * @param {String} url 请求的url
       */
  post (url, data = {}) {
    return new Promise(async (resolve, reject) => {
      // let header = {
      //   'content-type': 'application/json'
      // }
      // let self = this
      // console.log('req:' + url, data)
      wx.request({
        url: process.env.servicePath + url,
        data,
        // header,
        method: 'post',
        success (res) {
          // console.log('res:' + url, res)
          // if (res.data.errorCode === '0' || res.data.errorCode === 0 || res.data.errorCode === '200001') {
          resolve(res.data)
          // } else {
          // self.showToastE(res.data.errorMsg)
          // return Promise.reject(res.data)
          // }
        },
        fail (data) {
          reject(data)
        }
      })
    })
  },

  /**
   * @public
   * @function
   * @todo 封装ajax(),打包Ajax
   * @memberof Cain
   * @param {Array}  request - 请求参数
   *           request.interfaceNo - 接口号
   *           request.data - 请求数据
   *           request.alias - 别名
   *
   * @param {JSON}   response - 返回参数 ，可以不写，如果别写则以alias为key返回
   * @param {function} success -成功回调
   * @remark 可以使用 ${别名.param.param}
   */
  packagePost (json) {
    let param = JSON.parse(JSON.stringify(json))
    param.data = {}
    var reqL = param.request
    // 处理请求参数
    for (var i in reqL) {
      if (!this.isBlank(reqL[i].data)) {
        reqL[i].params = reqL[i].data
        delete reqL[i].data
      }
    }
    param.req = {}
    param.req.list = reqL
    // 处理返回参数
    if (this.isBlank(param.response)) {
      var resTemp = {}
      // 增加返回参数
      for (var j in reqL) {
        if (!this.isBlank(reqL[j].alias)) {
          resTemp[reqL[j].alias] = '${' + reqL[j].alias + '}'
        }
      }
      param.res = resTemp
    } else {
      param.res = param.response
    }
    console.log(param)
    delete param.request

    return this.post('interfaces', param)
  },
  /**
  * @public
  * @function
  * @todo 显示loading For wx
  * @memberof Cain
  */
  showLoading (title = '加载中...') {
    wx.showLoading({
      title,
      mask: true
    })
  },
  /**
  * @public
  * @function
  * @todo 隐藏loading For wx
  * @memberof Cain
  */
  hideLoading () {
    wx.hideLoading()
  },
  /**
  * @public
  * @function
  * @todo 显示Toast For wx
  * @memberof Cain
  */
  showToast (type, message) {
    let p = {}
    if (type === 'success') {
      p.image = '/static/image/cain/success.png'
    } else if (type === 'warn') {
      p.image = '/static/image/cain/warn.png'
    } else if (type === 'error') {
      p.image = '/static/image/cain/error.png'
    }
    p.title = message
    p.duration = 3000

    wx.showToast(p)
  },
  /**
  * @public
  * @function
  * @todo 显示SuccessToast For wx
  * @memberof Cain
  */
  showToastS (message) {
    this.showToast('success', message)
  },
  /**
  * @public
  * @function
  * @todo 显示Warn Toast For wx
  * @memberof Cain
  */
  showToastW (message) {
    this.showToast('warn', message)
  },
  /**
  * @public
  * @function
  * @todo 显示Warn Toast For wx
  * @memberof Cain
  */
  showToastE (message) {
    this.showToast('error', message)
  },
  /**
  * @public
  * @function
  * @todo 显示Confirm Model For wx
  * @memberof Cain
  */
  showConfirm (content, title = '提示', confirmText = '确认', cancelText = '再看看') {
    return new Promise(async (resolve, reject) => {
      wx.showModal({
        title,
        content,
        confirmText,
        cancelText,
        success (res) {
          if (res.confirm) {
            resolve()
          } else if (res.cancel) {
            reject(res)
          }
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
  * @public
  * @function
  * @todo 显示Alert Model For wx
  * @memberof Cain
  */
  showAlert (content, title = '提示') {
    return new Promise(async (resolve, reject) => {
      wx.showModal({
        title,
        content,
        showCancel: false,
        success (res) {
          resolve()
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
 * @public
 * @function
 * @todo 选择地址For wx
 * @memberof Cain
 */
  chooseLocation () {
    return new Promise(async (resolve, reject) => {
      await this.authorize('scope.userLocation')
      wx.chooseLocation({
        success (data) {
          resolve(data)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
  * @public
  * @function
  * @todo 得到用户权限同意For wx
  * @memberof Cain
  */
  authorize (scope, isAlert = true) {
    return new Promise(async (resolve, reject) => {
      let setting = ''
      try {
        setting = await this.getSetting()
      } catch (error) {
        reject(error)
        return false
      }

      if (setting.authSetting[scope] === undefined) {
        wx.authorize({
          scope,
          success (data) {
            resolve(data)
          },
          fail (e) {
            reject(new Error('用户未授权'))
          }
        })
      } else if (setting.authSetting[scope] === false) {
        if (isAlert) {
          this.showAlert('您之前已经禁用此功能，请在功能 "我的"->"我的授权"中打开相关功能')
        }
        reject(new Error('用户未授权'))
      } else {
        resolve()
      }
    })
  },
  // /**
  // * @public
  // * @function
  // * @todo 获取微信用户信息 For wx
  // * @memberof Cain
  // */
  getUserInfoForWx () {
    return new Promise(async (resolve, reject) => {
      wx.getUserInfo({
        success: function (res) {
          // let u = wx.getStorageSync('userInfoWx')
          // if (Cain.isBlank(u)) {
          //   u = {}
          // }

          resolve(res)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
  * @public
  * @function
  * @todo 微信登录获取微信信息 For wx
  * @memberof Cain
  */
  login () {
    return new Promise(async (resolve, reject) => {
      wx.login({
        success (res) {
          resolve(res)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
  * @public
  * @function
  * @todo 获取用户权限设置 For wx
  * @memberof Cain
  */
  getSetting () {
    return new Promise(async (resolve, reject) => {
      if (wx.getSetting) {
        wx.getSetting({
          success (res) {
            resolve(res)
          },
          fail (e) {
            reject(e)
          }
        })
      } else {
        reject(new Error('版本过低 '))
      }
    })
  },
  /**
  * @public
  * @function
  * @todo 获取设备信息 For wx
  * @memberof Cain
  * @return  promise对象
  */
  getSystemInfo () {
    return new Promise(async (resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          resolve(res)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
  * @public
  * @function
  * @todo 扫描 For wx
  * @memberof Cain
  * @return  promise对象
  */
  scanCode () {
    return new Promise(async (resolve, reject) => {
      wx.scanCode({
        success: function (res) {
          resolve(res)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
* @public
* @function
* @todo 上传文件 For wx
* @memberof Cain
* @return  promise对象
*/
  uploadFile (file) {
    return new Promise(async (resolve, reject) => {
      wx.uploadFile({
        url: process.env.fileSysPath + 'file/uploadFileNoCheck',
        filePath: file,
        name: 'files',
        // formData: {
        //   'user': 'test'
        // },
        success (res) {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.data))
            return
          }
          reject(res)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  /**
* @public
* @function
* @todo 选择图片 For wx
* @memberof Cain
* @return  promise对象
*/
  chooseImage (option) {
    return new Promise(async (resolve, reject) => {
      let param = {
        success (res) {
          let tempFilePaths = res.tempFilePaths
          resolve(tempFilePaths)
        },
        fail (e) {
          reject(e)
        }
      }

      param = Object.assign(param, option)
      wx.chooseImage(param)
    })
  },
  /**
* @public
* @function
* @todo 预览图片 For wx
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
* @todo 获取经纬度信息 For wx
* @memberof Cain
* @return  promise对象
*/
  getLocation (isRefresh = false) {
    return new Promise(async (resolve, reject) => {
      if (!isRefresh) {
        let res = wx.getStorageSync('userLocation')
        if (!this.isBlank(res)) {
          console.log('storeage ')
          resolve(res)
          return false
        }
      }
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          wx.setStorageSync('userLocation', res)
          resolve(res)
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
  wxPay (data) {
    return new Promise(async (resolve, reject) => {
      // let weChatNo = process.env.weChatNo
      // let userInfo = await this.getUserInfoForWx()

      // var p = {
      //   openid: userInfo.openid,
      //   orderId: this.getRowID(),
      //   body: '51惠补',
      //   totalFee: payMoney,
      //   fee: ((+payMoney) * 100).toFixed(2),
      //   payTime: this.getOperTime()
      // }
      // const res = await this.post(`wechatApi.do?apiType=pay&wechatNo=${weChatNo}`, p)
      // let data = res.data

      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.packageValue,
        'signType': data.signType,
        'paySign': data.paySign,
        success (res) {
          if (res.errMsg === 'requestPayment:ok') {
            resolve()
          } else {
            reject(new Error(res.errMsg))
          }
        },
        fail (res) {
          reject(new Error(res.errMsg))
        }
      })

      // if (parseInt(data.agent) < 5) {
      //   reject(new Error('您的微信版本版本过低,请下载最新微信'))
      //   return false
      // }
      // if (!this.isBlank(data.returnMsg)) {
      //   reject(new Error(data.returnMsg))
      //   return false
      // }

      /* eslint-disable */
      //   WeixinJSBridge.invoke('getBrandWCPayRequest', {
      //     // 'appId': data.appId,
      //     'timeStamp': data.timeStamp,
      //     'nonceStr': data.nonceStr,
      //     'package': data.packageValue,
      //     'signType': data.signType,
      //     'paySign': data.paySign
      //   },
      //     function (res) {
      //       if (res.err_msg === 'get_brand_wcpay_request:ok') {
      //         resolve()
      //       } else {
      //         reject(new Error(res.err_msg))
      //       }
      //     })
      //   /* eslint-enable */
    })
  },
  //设置剪切板内容
  setClipboard(content) {
    wx.setClipboardData({
      data: content,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //打电话
  callPhone(mobilePhone) {
    wx.makePhoneCall({
      phoneNumber: mobilePhone
    })
  }


  // /**
  //  * @public
  //  * @function
  //  * @todo  获取滚动高度
  //  * @memberof Cain
  //  */
  // getScroll () {
  //   return (document.documentElement.scrollTop || 0) + (document.body.scrollTop || 0)
  // },
  // /**
  //  * @public
  //  * @function
  //  * @todo  滚动到某一个位置
  //  * @memberof Cain
  //  */
  // scrollTo (val = 0) {
  //   document.documentElement.scrollTop = val
  //   document.body.scrollTop = val
  // }

}
