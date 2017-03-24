import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

import * as Views from './components/Views'

Vue.use(Router)

function cleanRoutes (obj) {
  _.each(obj, function (value, key) {
    if (_.isObject(value)) {
      cleanRoutes(value)
    } else {
      obj[key] = key === 'component' ? Views[value] : value
    }
  })
}

const router = new Router({
  mode: 'history'
})

export default router

axios.get('/api/auth/routes')
  .then((response) => {
    let routes = response.data.routes
    cleanRoutes(routes)
    router.addRoutes(routes)
  })
