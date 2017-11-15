/* global localStorage: false */
import router from 'src/router'
import api from '../../../api'

export function ATTEMPT ({ commit, state, dispatch }, credentials) {
  let companies = [
    { id: '1', name: 'Plus 3 Interactive' },
    { id: '2', name: 'Triton' }
  ]
  dispatch('AVAILABLE_COMPANIES', companies)

  return new Promise((resolve, reject) => {
    commit('ATTEMPT', credentials)
    api
      .post('/api/auth/login', state.attempt)
      .then(response => {
        let user = response.data.data.user

        // set api token
        let token = `${response.data.data.token_type} ${response.data.data
          .access_token}`
        dispatch('TOKEN', token)

        dispatch('AVAILABLE_COMPANIES', user.companies)
        if (user.current_company) {
          dispatch('SET_COMPANY', user.current_company)
        }
        dispatch('modal.show', { type: 'Company' })
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

export function CHECK_AUTH ({ commit, state, dispatch }, cb) {
  return new Promise((resolve, reject) => {
    if (!localStorage.hasOwnProperty('token')) {
      commit('LOGIN', false)
      router.push('/login')
      return reject(new Error('Unauthorized'))
    } else {
      dispatch('TOKEN', localStorage.getItem('token'))
    }

    api
      .get('/api/auth/user')
      .then(response => {
        let user = response.data.data
        dispatch('AVAILABLE_COMPANIES', user.companies)
        if (user.current_company) {
          dispatch('SET_COMPANY', user.current_company)
        } else {
          dispatch('modal.show', { type: 'Company' })
        }
        commit('LOGIN', true)
        commit('USER', response.data.data)
        dispatch('LOGGED')
        return resolve(true)
      })
      .catch(e => {
        router.push('/login')
        return resolve(false)
      })
  })
}

export function SET_COMPANY ({ commit, state }, company) {
  api
    .post('/api/auth/select-company', { company_id: company.id })
    .then(r => {
      commit('SET_COMPANY', r.data.data.current_company)
    })
    .catch(e => {
      commit('ERROR', e)
    })
}

export function LOGOUT ({ commit, state, rootState }) {
  commit('LOGOUT')
  router.push('/login')
}

export function login ({ commit, state }, token) {
  commit('LOGIN', token)
}

export function REQUEST_RESET ({ commit }, email) {
  api.post('/api/auth/password/email', { email: email }).then(response => {
    console.log(response)
  })
}

export function AVAILABLE_COMPANIES ({ commit }, availableCompanies) {
  commit('AVAILABLE_COMPANIES', availableCompanies)
}

export function RESET_PASSWORD ({ commit }, payload) {
  api.post('/api/auth/password/reset', payload).then(response => {
    console.log(response)
  })
}
