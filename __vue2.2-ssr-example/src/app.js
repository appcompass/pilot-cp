import Vue from 'vue'
import App from './App.vue'
import router from './routes'
// import store from './vuex/store'
// import { sync } from 'vuex-router-sync'

// sync(store, router)

const app = new Vue({
  router,
  // store,
  App
})

export { app, router }
