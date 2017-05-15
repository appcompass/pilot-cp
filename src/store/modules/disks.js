import Vue from 'src/main'

const state = {
  instances: [],
  selected: undefined
}

const getters = {
  // instances: state => state.instances.collection.data,
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
    Vue.axios.get('/api/disks').then(response => { state.instances = response.data.collection.data })
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
