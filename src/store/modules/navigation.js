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

const state = {
  navigation: {
    main_nav: {},
    user_nav: {}
  },
  side_nav: {}
}

const getters = {
  navigation: state => state.navigation,
  main_nav: state => state.navigation.main_nav,
  user_nav: state => state.navigation.user_nav,
  side_nav: state => state.side_nav
}

const actions = {
  'nav.init' ({commit, state}) {
    Vue.axios.get('/api/content/menus')
      .then(response => {
        commit('getNav', response.data)
      })
  },
  'nav.side.set' ({commit, state}, {url, full_nav}) {
    commit('setSideNav', findObject(url, full_nav))
  },
  'nav.side.reset' ({commit, state}) {
    state.side_nav = {}
  }
}

const mutations = {
  getNav (state, nav) {
    state.navigation = nav
  },
  setSideNav (state, nav) {
    state.side_nav = nav
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
