import CainToast from '@/components/cain/components/Toast/'
import CallPhone from '@/components/cain/components/CallPhone/'
import CainMessage from '@/components/cain/components/Message/'
import CainLoading from '@/components/cain/components/Loading/'

import Vue from 'vue'

const CallPhoneConstructor = Vue.extend(CallPhone)
const CPC = new CallPhoneConstructor({
  el: document.createElement('div')
})
document.body.appendChild(CPC.$el)

export default {
  install: function (Vue, opt) {
    if (!Vue.prototype.$cain) {
      Vue.prototype.$cain = {}
    }
    Vue.prototype.$cain.toast = CainToast
    Vue.prototype.$cain.message = CainMessage
    Vue.prototype.$cain.loading = CainLoading
    Vue.prototype.$cain.callPhone = CPC
  }
}
