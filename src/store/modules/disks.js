import api from '../../api'

const state = {
  instances: [],
  selected: undefined
}

const getters = {
  selected: state => state.selected
}

const actions = {
  FETCH_DISK_INSTANCES ({commit}, element) {
    api.get('/api/disks')
      .then(response => {
        commit('INSTANCES', response.data.collection.data)
      })
  },

  setDisk ({commit, state}, disk) {
    commit('DISK', disk)
  }
}

const mutations = {
  INSTANCES (state, instances) {
    state.instances = instances
  },

  DISK (state, disk) {
    state.selected = disk
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
