import api from '../../api'
import { default as router, processRoutes } from '../../router'
import _ from 'lodash'

/**
 * STATE
 * @NOTE state.navigation is being updated on init
 * while steate.side_nav etc is about navigation pieces that will be updated with payloads
 * @TODO unify routes and move check for navigation payload into Edit and List components (or just edit actually)
 */
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
  LOGGED ({ commit, dispatch }) {
    dispatch('INIT_ROUTES')
    dispatch('INIT_NAVIGATION')
  },

  INIT_NAVIGATION ({ commit, state }) {
    api.get('/api/menus').then(response => {
      delete response.data.debug
      commit('NAVIGATION', response.data)
    })
  },

  INIT_ROUTES ({ commit, state }) {
    api.get('/api/routes').then(response => {
      commit('ROUTES', response.data.routes)
    })
  },

  ROUTE_CHANGED ({ commit }, route) {},

  UPDATE_NAV ({ commit }, nav) {
    commit('UPDATE_NAV', nav)
  },

  SET_SIDE_NAV ({ commit, state }, subNav) {
    commit('SET_SIDE_NAV', subNav)
  },

  'nav.side.reset' ({ commit, state }) {
    state.side_nav = {}
  }
}

const mutations = {
  NAVIGATION (state, nav) {
    state.navigation = nav
  },

  SET_SIDE_NAV (state, sideNav) {
    state.side_nav = sideNav
  },

  UPDATE_NAV (state, nav) {
    Object.assign(state, nav)
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
  },

  ROUTE_CHANGED (state, nav) {
    state.sub_nav = nav
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
