import Form from 'Helpers/Form'

/**
 * State
 */

const state = {
  form: {
    collection: {},
    fields: [],
    errors: {}
  }
}

const getters = {
  form: state => state.form,
  collection: (state, getters) => path => {
    return state.form.get(path)
  },
  errors: (state, getters) => path => {
    return state.form.error(path)
  }
}

const actions = {
  SET_FORM ({ commit }, { form, collection }) {
    commit('FORM_INIT', { form, collection })
  },

  SET_COLLECTION ({ commit }, data) {
    commit('SET_FORM_DATA', data)
  },

  FORM_ERRORS ({ commit }, errors) {
    commit('SET_FORM_ERRORS', errors)
  }
}

const mutations = {
  FORM_INIT (state, { form, collection }) {
    state.form = new Form(form, collection)
  },

  SET_FORM_DATA (state, data) {
    console.log(data.pointer)
    state.form.clearError(data.pointer)
    state.form.set(data)
  },

  SET_FORM_ERRORS (state, errors) {
    state.form.fail(errors)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
