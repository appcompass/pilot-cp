import api from '../../api'
import { default as router, processRoutes } from '../../router'
import _ from 'lodash'

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
  routes: {},
  side_nav: {}
}

const getters = {
  navigation: state => state.navigation,
  main_nav: state => state.navigation.main_nav,
  user_nav: state => state.navigation.user_nav,
  routes: state => state.routes,
  side_nav: state => state.side_nav
}

const actions = {

  LOGGED ({commit, dispatch}) {
    dispatch('INIT_ROUTES')
    dispatch('INIT_NAVIGATION')
  },

  INIT_NAVIGATION ({commit, state}) {
    api.get('/api/menus')
      .then(response => {
        commit('NAVIGATION', response.data)
      })
  },

  INIT_ROUTES ({commit, state}) {
    api.get('/api/routes')
      .then(response => {
        commit('ROUTES', response.data.routes)
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
  NAVIGATION (state, nav) {
    state.navigation = nav
  },
  setSideNav (state, nav) {
    state.side_nav = nav
  },
  ROUTES (state, routes) {
    // @TODO every request gets fired multiple times. i have no idea why
    // routes nesting? parent resolves -> fires // children resolves -> fires
    // quadruple-check the beforeEveryRoute or whatever that's called and semaphore the crap out of it
    // THUS, FOR NOW: to prevent a ton of dupes warning from vue router we only inject if
    // there's nothing there
    if (_.isEmpty(state.routes)) {
      processRoutes(routes)
      router.addRoutes(routes)
      state.routes = routes
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
