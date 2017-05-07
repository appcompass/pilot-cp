/* global localStorage: false */
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

import Layouts from 'components/Layouts'
import Pages from 'components/Pages'

Vue.use(Router)

function processComponent (value) {
  if (_.isObject(value)) {
    _.each(value, function (val, key) {
      value[key] = processComponent(val)
    })
  } else {
    if (Layouts[value]) {
      value = Layouts[value]
    } else if (Pages[value]) {
      value = Pages[value]
    } else {
      console.log('there is no layout or view by the name of ' + value)
    }
  }
  return value
}

function processRoutes (obj) {
  _.each(obj, function (value, key) {
    if (key === 'component') {
      obj[key] = processComponent(value)
    } else {
      if (_.isObject(value)) {
        processRoutes(value)
      }
    }
  })
}

// // variable used to track if we've called the router api end point yet.
// let callCheck = false

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  // linkActiveClass: 'is-active',
  routes: [
    {path: '', redirect: '/dashboard'}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // @TODO: instead of just relying on the token, switch to using store/local storage 'authenticated' value
    if (!localStorage.getItem('auth_token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// @TODO: we need to prevent any routing attempts until after the api request.
// i.e. a loading screen on every initial hard load or something.
axios.get('/api/routes')
  .then((response) => {
    let routes = response.data.routes
    processRoutes(routes)
    router.addRoutes(routes)
  })

export default router
