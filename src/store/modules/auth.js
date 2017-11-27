/* global localStorage: false */
import router from 'src/router'
import api from '../../api'
import Abilities from '../../Helpers/Abilities'

/**
 * State
 */

const state = {
  authenticated: false,
  abilities: new Abilities(),
  error: undefined,
  user: {
    profile: {
      gravatar_url: null
    },
    company: {
      current: {},
      available: []
    }
  },
  attempt: {
    email: undefined,
    password: undefined
  }
}

/**
 * Actions
 */

const actions = {
  ATTEMPT ({ commit, state, dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      commit('ATTEMPT', credentials)
      api
        .post('/api/auth/login', state.attempt)
        .then(response => {
          let data = response.data.data
          let user = data.user

          // set api token
          let token = `${data.token_type} ${data.access_token}`
          dispatch('TOKEN', token)

          dispatch('AVAILABLE_COMPANIES', user.companies)
          if (user.current_company) {
            dispatch('SET_COMPANY', user.current_company)
          }
          if (user.companies.length > 1) {
            dispatch('modal.show', { type: 'Company' })
          } else {
            dispatch('SET_COMPANY', user.companies[0])
          }
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
  },

  CHECK_AUTH ({ commit, state, dispatch }, cb) {
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
            if (user.companies.length > 1) {
              dispatch('modal.show', { type: 'Company' })
            } else {
              dispatch('SET_COMPANY', user.companies[0])
            }
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
  },

  SET_COMPANY ({ commit, state }, company) {
    api
      .post('/api/auth/select-company', { company_id: company.id })
      .then(r => {
        commit('SET_COMPANY', r.data.data.current_company)
      })
      .catch(e => {
        commit('ERROR', e)
      })
  },

  LOGOUT ({ commit, state, rootState }) {
    commit('LOGOUT')
    router.push('/login')
  },

  login ({ commit, state }, token) {
    commit('LOGIN', token)
  },

  REQUEST_RESET ({ commit }, email) {
    api.post('/api/auth/password/email', { email: email }).then(response => {
      console.log(response)
    })
  },

  AVAILABLE_COMPANIES ({ commit }, availableCompanies) {
    commit('AVAILABLE_COMPANIES', availableCompanies)
  },

  RESET_PASSWORD ({ commit }, payload) {
    api.post('/api/auth/password/reset', payload).then(response => {
      console.log(response)
    })
  }
}

/**
 * Getters
 */

const getters = {
  state: state => state.logged,
  authenticated: state => state.authenticated,
  user: state => state.user.profile,
  company: state => state.user.company,
  abilities: state => state.abilities
}

/**
 * Mutations
 */

const mutations = {
  ATTEMPT (state, { email, password }) {
    state.attempt.email = email
    state.attempt.password = password
  },

  LOGIN (state, success) {
    state.attempt = {}
    state.authenticated = success
    state.user.authenticated = success
  },

  LOGOUT (state) {
    state.user = {
      authenticated: false,
      profile: {
        gravatar_url: undefined,
        profile: {
          gravatar_url: null
        }
      },
      company: {
        current: {},
        available: []
      }
    }
  },

  USER (state, user) {
    state.user.profile = user
  },

  SET_COMPANY (state, company) {
    state.user.company.current = company
  },

  AVAILABLE_COMPANIES (state, companies) {
    state.user.company.available = companies
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
