/* global localStorage: false */
import api from '../../api'

const state = {
  token: undefined,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': undefined,
    'X-Csrf-Token': undefined
  }
}

const getters = {
  token: state => state.token,
  headers: state => state.headers
}

const actions = {
  TOKEN ({commit, state, dispatch}, token) {
    commit('TOKEN', token)
    dispatch('FETCH_CSRF')
    dispatch('ADD_HEADER', {key: 'X-Requested-With', value: 'XMLHttpRequest'})
    dispatch('ADD_HEADER', {key: 'Authorization', value: token})
  },

  FETCH_CSRF ({commit, dispatch}) {
    api.get('/api/web-forms/token')
      .then((response) => {
        dispatch('ADD_HEADER', {key: 'X-Csrf-Token', value: response.data})
      })
  },

  LOGOUT ({commit}) {
    commit('LOGOUT')
  },

  ADD_HEADER ({commit}, header) {
    commit('HEADER', header)
  }
}

const mutations = {
  TOKEN (state, token) {
    localStorage.setItem('token', token)
    state.token = token
    api.http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },

  LOGOUT (state) {
    state.headers = {}
    state.token = undefined
    api.http.defaults.headers.common = state.headers
    localStorage.removeItem('token')
    localStorage.removeItem('csrf_token')
  },

  HEADER (state, {key, value}) {
    state.headers[key] = value
    api.http.defaults.headers.common = state.headers
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
