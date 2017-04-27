import Vue from 'src/main'

const state = {
  instances: {collection: {data: {}}},
  selected: undefined
}

const getters = {
  instances: state => state.instances,
  selected: state => state.selected
}

const actions = {
  fetch ({commit, state}, element) {
    commit('fetch', element)
  },
  setDisk ({commit, state}, id) {
    commit('set', id)
  }
}

const mutations = {
  fetch (state, element) {
    Vue.axios.get('/api/storage').then(response => { state.instances = response.data })
  },
  set (state, id) {
    state.selected = id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
