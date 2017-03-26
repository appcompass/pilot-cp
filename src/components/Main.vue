<template lang="pug">
  div#app
    Private(v-if="auth.user.authenticated")
    Public(v-else)
</template>

<script>
import auth from './../States/Auth.js'
import Private from './Layouts/Private'
import Public from './Layouts/Public'

export default {
  name: 'Main',
  data () {
    return {
      auth: auth,
      authorized: false
    }
  },
  components: {Private, Public},
  created () {
    auth.check()
    // this.routeChanged()
  },
  mounted () {
    if (auth.user.authenticated) {
      this.authorized = true
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.routeChanged()
  //   }
  // },
  methods: {
    // routeChanged () {
    //   this.axios.interceptors.response.use(function (response) {
    //     if (response.data.api_url) {
    //       NavigationState.setApiUrl(response.data.api_url)
    //     }
    //     return response
    //   })
    // }
  }
}
</script>
