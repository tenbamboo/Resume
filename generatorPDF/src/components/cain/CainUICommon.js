import CainToast from '@/components/cain/components/Toast/'
import CallPhone from '@/components/cain/components/CallPhone/'
import CainMessage from '@/components/cain/components/Message/'
import CainLoading from '@/components/cain/components/Loading/'

import Vue from 'vue'

// callPhone
const CallPhoneConstructor = Vue.extend(CallPhone)
const callPhone = new CallPhoneConstructor({
  el: document.createElement('div')
})
document.body.appendChild(callPhone.$el)

// toast
const CainToastConstructor = Vue.extend(CainToast)
const toast = new CainToastConstructor({
  el: document.createElement('div')
})
document.body.appendChild(toast.$el)

export default {
  install: function (Vue, opt) {
    if (!Vue.prototype.$cain) {
      Vue.prototype.$cain = {}
    }
    Vue.prototype.$cain.toast = toast
    Vue.prototype.$cain.message = CainMessage
    Vue.prototype.$cain.loading = CainLoading
    Vue.prototype.$cain.callPhone = callPhone
  }
}
