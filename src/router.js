import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

import * as Views from './components/Views'

Vue.use(Router)

function processRoutes (obj, lib) {
  _.each(obj, function (value, key) {
    if (_.isObject(value)) {
      processRoutes(value, lib)
    } else {
      switch (key) {
        case 'component':
          if (Views[value]) {
            obj[key] = Views[value]
          }
          break
        case 'full_path':
          if (obj['name']) {
            lib[obj['name']] = value
          }
          break
      }
    }
  })
}

const router = new Router({
  mode: 'history'
})

export default router

axios.get('/api/routes')
  .then((response) => {
    let routes = response.data.routes
    let lib = {}
    processRoutes(routes, lib)
    // console.log(lib)
    router.addRoutes(routes)
  })
