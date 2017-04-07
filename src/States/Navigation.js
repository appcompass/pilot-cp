import Vue from 'src/main'

function findObject (url, haystack, res) {
  for (let i = 0; i < haystack.length; i++) {
    let current = haystack[i]
    if (current.url === url) {
      res = current.children
    } else if (current.children.length) {
      res = findObject(url, current.children, res)
    }
  }
  return res
}

export default {
  full: null,
  user: null,
  api_url: null,
  init () {
    return Vue.axios.get('/api/content/menus')
      .then(response => {
        this.full = response.data.main_nav
        this.user = response.data.user_nav
      })
  },
  get (url) {
    if (this.full === null) {
      return this.init()
        .then(() => {
          return this.search(url)
        })
    } else {
      return this.search(url)
    }
  },
  search (url) {
    return new Promise((resolve, reject) => {
      if (url) {
        let part = findObject(url, this.full)
        return resolve(part)
      }
    })
  },
  clear () {
    this.full = null
    this.user = null
    this.api_url = null
  }
}
