// import _ from 'lodash'

const state = {
  visible: false,
  model: {},
  data: undefined,
  config: {
    type: undefined,
    css: undefined
  }
}

const getters = {
  data: state => state.data,
  visible: state => state.visible
}

const actions = {
  'modal.show' ({commit, state}, config) {
    if (config.cb) {
      state.config.cb = config.cb
    }
    state.config.type = config.type
    state.config.css = config.css
    state.data = config.data || null
    commit('VISIBILITY', true)
  },
  'modal.hide' ({commit, state}) {
    commit('VISIBILITY', false)
    return true
  },
  'modal.done' ({commit, state}, model) {
    state.model = model
    if (state.config.cb) {
      state.config.cb(state.model)
    }
    commit('VISIBILITY', false)
  }
}

const mutations = {
  VISIBILITY (state, visible) {
    state.visible = visible
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
