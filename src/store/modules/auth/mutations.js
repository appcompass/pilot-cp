export function ATTEMPT (state, { email, password }) {
  state.attempt.email = email
  state.attempt.password = password
}

export function LOGIN (state, success) {
  state.attempt = {}
  state.authenticated = success
  state.user.authenticated = success
}

export function LOGOUT (state) {
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
}

export function USER (state, user) {
  state.user.profile = user
}

export function SET_COMPANY (state, company) {
  state.user.company.current = company
}

export function AVAILABLE_COMPANIES (state, companies) {
  state.user.company.available = companies
}
