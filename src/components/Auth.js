/* global localStorage: false */
import Vue, {router} from '../main.js'
import State from './State'

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
    if (localStorage.getItem('id_token') !== null) {
      return Vue.http.get(process.env.API_SERVER + 'auth/user')
        .then(response => {
          this.user.authenticated = true
          this.user.profile = response.data
          State.init()
        }, response => {
          router.push({ name: 'login' })
        })
    } else {
      router.push({ name: 'login' })
    }
  },
  login (context, email, password) {
    Vue.http.post(process.env.API_SERVER + 'auth/login', { email: email, password: password })
      .then(response => {
        context.error = false
        localStorage.setItem('id_token', response.data.access_token)
        Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

        this.user.authenticated = true
        this.user.profile = response.data.user

        State.init()

        router.push({
          name: 'dashboard'
        })
      }, response => {
        context.error = true
      })
  },
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    this.user.profile = null

    State.clear()

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
    Vue.http.post(process.env.API_SERVER + 'api/register', payload)
      .then(response => {
        context.success = true
      }, response => {
        context.response = response.data
        context.error = true
      })
  }
}
