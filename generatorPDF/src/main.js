import Vue from 'vue'
import App from './App'
import resource from './resource'
import store from './store'
import router from './router'

import '@static/css/normalize.css'
import '@static/css/common.css'
// import '@/components/weui/weui.css'

import _ from '@/components/common/localLodash.js'
import CainUICommon from '@/components/cain/CainUICommon'

// import Demo from '@/components/demo/'
// import User from '@/components/user/'
// import Meeting from '@/components/meeting/'
// import FollowUp from '@/components/followUp/'
// import QA from '@/components/qa/'
// import My from '@/components/my/'
// Vue.use(Demo, {router})
// Vue.use(User, {router})
// Vue.use(Meeting, {router})
// Vue.use(FollowUp, {router})
// Vue.use(QA, {router})
// Vue.use(My, {router})

Vue.prototype.$_ = _

resource.init()

Vue.use(CainUICommon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
