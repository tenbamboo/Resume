import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  rootUserId: 0
}

const mutations = {
  // 设置UserId
  setRootUserId (state, userId) {
    state.rootUserId = userId
  }
}
const actions = {}
const getters = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
