const state = {
  visible: false,
  model: {},
  type: undefined,
  cb: undefined
}

const getters = {
  visible: () => state.visible
}

const actions = {
  'modal.show' ({commit, state}, {type, cb}) {
    if (cb) {
      state.cb = cb
    }
    // MediaModal, FormBuilderModal
    state.type = type + 'Modal'
    state.visible = true
    commit('visibility')
  },
  'modal.hide' ({commit, state}) {
    state.visible = false
  },
  'modal.done' ({commit, state}, model) {
    state.visible = false
    state.model = model
    if (state.cb) {
      state.cb(state.model)
    }
    commit('visibility')
  }
}

const mutations = {
  visibility (state) {
    // do stuff if ya need
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
