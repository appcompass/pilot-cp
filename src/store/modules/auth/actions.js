/* global localStorage: false */
import router from 'src/router'
import api from '../../../api'

export function ATTEMPT ({commit, state, dispatch}, credentials) {
  return new Promise((resolve, reject) => {
    commit('ATTEMPT', credentials)
    api.post('/api/auth/login', state.attempt)
      .then((response) => {
        let token = `${response.data.data.token_type} ${response.data.data.access_token}`
        dispatch('TOKEN', token)
        commit('LOGIN', true)
        commit('USER', response.data.data.user)
        dispatch('LOGGED')
        return resolve(true)
      })
      .catch(error => {
        commit('LOGIN', false)
        reject(error)
      })
  })
}

export function CHECK_AUTH ({commit, state, dispatch}, cb) {
  return new Promise((resolve, reject) => {
    if (!localStorage.hasOwnProperty('token')) {
      commit('LOGIN', false)
      router.push('/login')
      return reject(new Error('Unauthorized'))
    } else {
      dispatch('TOKEN', localStorage.getItem('token'))
    }
    api.get('/api/auth/user')
      .then(response => {
        commit('LOGIN', true)
        commit('USER', response.data.data)
        dispatch('LOGGED')
        return resolve(true)
      }, response => {
        router.push('/login')
        return resolve(false)
      })
  })
}

export function LOGOUT ({commit, state, rootState}) {
  commit('LOGOUT')
  router.push('/login')
}

export function login ({commit, state}, token) {
  commit('LOGIN', token)
}

export function REQUEST_RESET ({commit}, email) {
  api.post('/api/auth/password/email', {email: email})
    .then((response) => {
      console.log(response)
    })
}

export function RESET_PASSWORD ({commit}, payload) {
  api.post('/api/auth/password/reset', payload)
    .then(response => {
      console.log(response)
    })
}
