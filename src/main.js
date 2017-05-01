import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
// import Auth from 'States/Auth'
import VueSweetAlert from 'vue-sweetalert'
import directives from './directives'
import App from './App'
import router from './router'

import { sync } from 'vuex-router-sync'
// @TODO: this needs to be moved into assets/sass/
import '../templates/assets/sass/app.scss'

// - Vuex

import Vuex from 'vuex'
import * as actions from './store/actions'
import * as getters from './store/getters'
import disks from './store/modules/disks'
import modal from './store/modules/modal'

import FormBuilder from 'components/FormBuilder'
Vue.component('FormBuilder', FormBuilder)

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    disks,
    modal
  },
  getters,
  actions
})

// -

Vue.use(VueAxios, axios)
Vue.use(VueSweetAlert)
Vue.use(directives)

sync(store, router)

export default Vue

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
