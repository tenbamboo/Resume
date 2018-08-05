'use strict'
/* eslint-disable */
/**
 * @todo Cain校验工具包
 * @namespace Cain.validator
 * @author haze.liu
 * @since 2016年3月8日 18:34:22
 */
export default {
  blank: /\s/,
  require: /\S+/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  mobile: /^1[3|4|5|7|8|9]\d{9}$/,
  url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
  currency: /^\d+(\.\d+)?$/,
  number: /^\d+$/,
  zip: /^[1-9]\d{5}$/,
  qq: /^[1-9]\d{4,8}$/,
  integer: /^[-\+]?\d+$/,
  double: /^[-\+]?\d+(\.\d+)?$/,
  english: /^[A-Za-z]+$/,
  chinese: /^[\u0391-\uFFE5]+$/,
  safeString: /^(([^\^<>\+_#·%`&'"'\\/])*)$/,
  ip: /^\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b$/,
  telephone: /^\d{11,12}$/,
  certNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,

  v: function (val, model) {
    var _this = this
    if (model && model.indexOf(',') !== -1) { // 判断是否为多校验
      var am = model.split(',')
      for (var i = 0, l = am.length; i < l; i++) {
        if (!(_this[am[i]].test(val))) {
          return false
        }
      }
      return true
    } else {
      return _this[model || 'require'].test(val)
    }
  }

}
/* eslint-enable */
