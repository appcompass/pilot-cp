/* global localStorage: false */
import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
import _ from 'lodash'
// import store from './store'

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
    {
      path: '',
      redirect: '/dashboard'
    },
    {
      path: '',
      component: Layouts['Public'],
      children: [
        {
          path: '/login',
          name: 'login',
          meta: {
            title: 'Login'
          },
          component: Pages['Login']
        },
        {
          path: '/logout',
          name: 'logout',
          component: {
            mounted () {
              this.$store.dispatch('LOGOUT')
              this.$router.push({ name: 'login' })
            }
          }
        },
        {
          path: '/register',
          name: 'register',
          meta: {
            title: 'Register'
          },
          component: Pages['Register']
        },
        {
          path: '/request-password-reset',
          name: 'request-password-reset',
          meta: {
            title: 'Request Password Reset'
          },
          component: Pages['PasswordEmail']
        },
        {
          path: '/reset-password/:reset_password',
          name: 'reset-password',
          meta: {
            title: 'Reset Password'
          },
          component: Pages['PasswordReset']
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
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

export default router
export { processRoutes }
