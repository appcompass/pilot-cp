import Vue from '../main'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import disks from './modules/disks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    disks
  },
  getters,
  actions
})
