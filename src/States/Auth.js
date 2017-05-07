/* global localStorage: false */
import Vue from 'src/main'
import router from 'src/router'

class Abilities {
  constructor () {
    this.abilities = []
  }

  set (abilities) {
    if (!Array.isArray(abilities)) {
      console.error('Abilities must be an array.')
    }
    abilities.forEach((ability) => {
      this.abilities.push(ability)
    })
  }

  has (ability) {
    if (!this.abilities) {
      return false
    }
    return this.abilities.includes(ability)
  }

}

export default {
  abilities: new Abilities(),
  user: {
    authenticated: false,
    profile: {
      gravatar_url: null
    }
  },
  check (cb) {
    if (localStorage.getItem('auth_token') !== null) {
      return Vue.axios.get('/api/auth/user')
        .then(response => {
          this.user.authenticated = true
          this.user.profile = response.data
          if (cb) {
            cb(this.user)
          }
        }, response => {
          if (cb) {
            cb(null)
          }
          router.push({ name: 'login' })
        })
    } else {
      if (cb) {
        cb(null)
      }
      router.push({ name: 'login' })
    }
  },
  login (context, email, password) {
    Vue.axios.post('/api/auth/login', { email: email, password: password })
      .then(response => {
        let redirect = context.$route.query.redirect ? context.$route.query.redirect : '/dashboard'
        context.error = false
        localStorage.setItem('auth_token', response.data.token_type + ' ' + response.data.access_token)
        Vue.axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token')

        this.user.authenticated = true
        this.user.profile = response.data.user

        context.$router.push(redirect)
      })
      .catch(error => {
        console.log(error)
        context.response = error.response.data
        context.error = true
      })
  },
  logout () {
    localStorage.removeItem('auth_token')
    this.user.authenticated = false
    this.user.profile = null

    router.push({
      name: 'login'
    })
  },
  // register (context, form) {
  //   let payload = form
  //   Vue.axios.post('/api/auth/register', payload)
  //     .then(response => {
  //       context.success = true
  //     }, error => {
  //       context.response = error.response.data
  //       context.error = true
  //     })
  // },
  requestReset (context, payload) {
    this.send('/api/auth/password/email', context, payload)
  },
  resetPassword (context, payload) {
    this.send('/api/auth/password/reset', context, payload)
  },
  send (endpoint, context, payload) {
    Vue.axios.post(endpoint, payload)
      .then(response => {
        context.response = response.data
        context.success = true
        context.error = false
      }, error => {
        context.response = error.response.data
        context.error = true
      })
  }
}
