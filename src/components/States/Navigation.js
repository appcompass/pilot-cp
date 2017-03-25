import Vue from '../../main.js'

function findObject (title, haystack, res) {
  for (let i = 0; i < haystack.length; i++) {
    let current = haystack[i]
    if (current.title === title) {
      res = current.children
    } else if (current.children.length) {
      res = findObject(title, current.children, res)
    }
  }
  return res
}

export default {
  full: null,
  user: null,
  left: null,
  api_url: null,
  init () {
    return Vue.axios.get('/api/content/menus')
      .then(response => {
        this.full = response.data.main_nav
        this.user = response.data.user_nav
      })
  },
  setApiUrl (url) {
    if (url) {
      this.api_url = '/api' + url
    }
  },
  get (route) {
    if (this.full === null) {
      return this.init()
        .then(() => {
          return this.search(route)
        })
    } else {
      return this.search(route)
    }
  },
  search (route) {
    return new Promise((resolve, reject) => {
      if (route) {
        let part = findObject(route.charAt(0).toUpperCase() + route.slice(1), this.full)
        return resolve(part)
      } else {
        return resolve(this.full)
      }
    })
  },
  setEditTabs (route, model) {
    this.get(route)
      .then(subnav => {
        this.left = {
          nav: subnav,
          model: model
        }
      })
  },
  clear () {
    this.full = null
  }
}
