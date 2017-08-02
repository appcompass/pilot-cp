/* global localStorage: false */
import router from 'src/router'
import api from '../../../api'

export function ATTEMPT ({commit, state, dispatch}, credentials) {
  commit('ATTEMPT', credentials)
  return new Promise((resolve, reject) => {
    api.post('/api/auth/login', state.attempt)
      .then((response) => {
        let token = `${response.data.token_type} ${response.data.access_token}`
        commit('LOGIN', true)
        dispatch('TOKEN', token)
        // dispatch('INIT_ROUTER') // @TODO: we need to re-fire router fetching after login, otherwise the user will continue to see guest navigation pending a hard refresh.
        commit('USER', response.data.user)
        dispatch('LOGGED')
        return resolve(true)
      })
      .catch(error => {
        commit('LOGIN', false)
        reject(error)
      })
  })
}

export function CHECK_AUTH ({commit, state, rootState, dispatch}, cb) {
  let token = localStorage.getItem('token')
  // @TODO ??? vvv some assignemnt must be off
  if (token === 'null' || token === null) {
    return router.push('/login')
  }
  dispatch('TOKEN', token)
  return new Promise((resolve, reject) => {
    api.get('/api/auth/user')
      .then(response => {
        dispatch('LOGGED')
        commit('LOGIN', true)
        commit('USER', response.data)
        return resolve(true)
      }, response => {
        router.push('/login')
        return resolve(true)
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
