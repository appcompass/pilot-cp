import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
// import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  getters
  // actions
})

export default store
