/* global localStorage: false */
import Vue, {router} from '../main.js'
import NavigationState from './States/Navigation'

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
  check () {
    if (localStorage.getItem('auth_token') !== null) {
      return Vue.axios.get('/api/auth/user')
        .then(response => {
          this.user.authenticated = true
          this.user.profile = response.data
          NavigationState.init()
        }, response => {
          router.push({ name: 'login' })
        })
    } else {
      router.push({ name: 'login' })
    }
  },
  login (context, email, password) {
    Vue.axios.post('/api/auth/login', { email: email, password: password })
      .then(response => {
        context.error = false
        localStorage.setItem('auth_token', response.data.token_type + ' ' + response.data.access_token)
        Vue.axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token')

        this.user.authenticated = true
        this.user.profile = response.data.user

        NavigationState.init()

        router.push({
          name: 'dashboard'
        })
      }, error => {
        context.response = error.response.data
        context.error = true
      })
  },
  logout () {
    localStorage.removeItem('auth_token')
    this.user.authenticated = false
    this.user.profile = null

    NavigationState.clear()

    router.push({
      name: 'login'
    })
  },
  register (context, name, email, password) {
    let payload = {
      name: name,
      email: email,
      password: password
    }
    Vue.axios.post('/api/auth/register', payload)
      .then(response => {
        context.success = true
      }, error => {
        context.response = error.response.data
        context.error = true
      })
  }
}
