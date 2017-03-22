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
  left_nav: null,
  current_url: null,
  init () {
    return Vue.axios.get('/api/content/menus')
      .then(response => {
        this.full = response.data.main_nav
      })
  },
  setCurrent (params) {
    this.current_url = ''
    if (params.model) {
      this.current_url += '/' + params.model.split('_').join('/')
    }
    if (params.id) {
      this.current_url += '/' + params.id
    }
    if (params.sub) {
      this.current_url += '/' + params.sub
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
        this.left_nav = {
          nav: subnav,
          model: model
        }
      })
  },
  clear () {
    this.full = null
  }
}
