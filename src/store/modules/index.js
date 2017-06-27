// @NOTE Looks good but breaks in various scenarios

// const files = require.context('.', false, /\.js$/)
// const modules = {}
// files.keys().forEach((key) => {
//   if (key === './index.js') return
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
// })

// export default modules

import disks from './disks'
import navigation from './navigation'
import modal from './modal'
import auth from './auth'
import api from './api'

export default {
  disks,
  navigation,
  modal,
  api,
  auth
}
