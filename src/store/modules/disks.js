import Vue from 'src/main'

const state = {
  instances: [],
  selected: undefined
}

const getters = {
  instances: state => state.instances
}

const actions = {
  fetch ({commit, state}, element) {
    commit('fetch', element)
  }
}

const mutations = {
  fetch (state, element) {
    Vue.axios.get('/api/storage').then(response => { state.instances = response.data })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
