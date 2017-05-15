import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
// import Auth from 'States/Auth'
import VueSweetAlert from 'vue-sweetalert'
import directives from './directives'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
// @TODO: this needs to be moved into assets/sass/
import '../templates/assets/sass/app.scss'

import FormBuilder from 'components/FormBuilder'
Vue.component('FormBuilder', FormBuilder)

Vue.use(VueAxios, axios)
Vue.use(VueSweetAlert)
Vue.use(directives)

sync(store, router)

export default Vue

Vue.prototype.filters = {
  capitalize (word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
  }
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
