import _ from 'lodash'

const state = {
  visible: false,
  model: {},
  data: undefined,
  config: {
    type: undefined,
    css: undefined,
    canClose: true
  }
}

const getters = {
  data: state => state.data,
  visible: state => state.visible
}

const actions = {
  'modal.show' ({commit, state}, config) {
    commit('CONFIG', config)
    commit('VISIBILITY', true)
  },
  'modal.hide' ({commit, state}) {
    return commit('VISIBILITY', false)
  },
  'modal.done' ({commit, state}, model) {
    let config = _.cloneDeep(state.config)
    config.canClose = true
    commit('CONFIG', config)
    commit('MODEL', model)
    commit('VISIBILITY', false)
    if (state.config.cb) {
      state.config.cb(state.model)
    }
  }
}

const mutations = {
  CONFIG (state, config) {
    state.config = config
  },
  VISIBILITY (state, visible) {
    if (!state.config.canClose && visible === false) {
      return false
    }
    state.visible = visible
    return true
  },
  MODEL (state, model) {
    state.model = model
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
