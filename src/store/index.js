import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters'


Vue.use(Vuex)

const state = {
  cartList:[]
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
