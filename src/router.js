import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

import * as Views from './components/Views'

Vue.use(Router)

function processRoutes (obj) {
  _.each(obj, function (value, key) {
    if (_.isObject(value)) {
      processRoutes(value)
    } else {
      if (key === 'component') {
        if (Views[value]) {
          obj[key] = Views[value]
        } else {
          console.log('there is no view by the name of ' + value)
        }
      }
    }
  })
}

const router = new Router({
  mode: 'history',
  routes: []
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
