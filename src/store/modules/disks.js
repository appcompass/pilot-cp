import Vue from 'src/main'

const state = {
  instances: [],
  selected: undefined
}

const getters = {
  selected: state => state.selected
}

const actions = {
  fetch ({commit, state}, element) {
    commit('fetch', element)
  },
  setDisk ({commit, state}, disk) {
    commit('set', disk)
  }
}

const mutations = {
  fetch (state, element) {
    Vue.axios.get('/api/disks')
      .then(response => { state.instances = response.data.collection.data })
  },
  set (state, disk) {
    state.selected = disk
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
