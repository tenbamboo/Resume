import Vue from 'vue'
import axios from 'axios'

let normalHttp = axios.create({})

// normalHttp.defaults.baseURL = process.env.serviceUrl
normalHttp.defaults.headers.post['Content-Type'] = 'application/json'
normalHttp.defaults.timeout = 10000

normalHttp.interceptors.request.use((config) => {
  requestAspect(config)
  return config
})

normalHttp.interceptors.response.use((response) => {
  responseAspect(response)
  return response.data
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  errorHandle(err)
  return Promise.reject(err)
})

// 文件服务
let fileHttp = axios.create({})

// fileHttp.defaults.baseURL = process.env.fileSysPath
fileHttp.defaults.headers.post['Content-Type'] = 'multipart/form-data'
fileHttp.defaults.timeout = 50000

fileHttp.interceptors.request.use((config) => {
  requestAspect(config)
  return config
})

fileHttp.interceptors.response.use((response) => {
  responseAspect(response)
  return response
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  errorHandle(err)
  return Promise.reject(err)
})

function requestAspect (config) {
  if (process.env.NODE_ENV === 'development') {
    console.log('rquest url =' + config.url, 'rquest body =', config.data)
  }
}

function responseAspect (response) {
  if (process.env.NODE_ENV === 'development') {
    console.log('response url =' + response.config.url, 'response stateCoed =' + response.status, 'response body =', response.data)
  }
}

function errorHandle (err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
}
let normalHttpRes = {
  /**
   * @param param.url 正常url
   * @param param.model 模块名，可无，如果没有则获取基础URL
   * @param param.data 请求参数
   *
   */
  post (param) {
    let rootMappingUrl = sessionStorage.getItem('rootMappingUrl')
    if (!rootMappingUrl || rootMappingUrl === null) {
      console.log('未指定映射URL文件')
      return false
    }
    rootMappingUrl = JSON.parse(rootMappingUrl)
    let baseUrl = rootMappingUrl[param.model] ? rootMappingUrl[param.model] : rootMappingUrl.baseUrl
    if (!param.data) {
      param.data = {}
    }
    return normalHttp.post(baseUrl + param.url, param.data)
  }
}
Vue.prototype.$http = normalHttpRes // normalHttp
Vue.prototype.$httpFile = fileHttp

export default {
  init () { }
}
