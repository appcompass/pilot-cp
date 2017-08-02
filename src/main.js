import Vue from 'vue'

import App from './App'
import store from './store'
import FormBuilder from './components/FormBuilder'
import router from './router'
import directives from './directives'
import { sync } from 'vuex-router-sync'
import '../templates/assets/sass/app.scss'

// LockScreen is loaded per-view (Private.vue)

Vue.component('FormBuilder', FormBuilder)

Vue.config.silent = true

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
