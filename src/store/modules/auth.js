import * as actions from './auth/actions'
import * as getters from './auth/getters'
import * as mutations from './auth/mutations'

class Abilities {
  constructor () {
    this.abilities = []
  }

  set (abilities) {
    if (!Array.isArray(abilities)) {
      console.error('Abilities must be an array.')
    }
    abilities.forEach(ability => {
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
  state: {
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
  },
  getters,
  actions,
  mutations
}
