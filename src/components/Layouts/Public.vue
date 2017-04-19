<template lang="pug">
  .site-logout
    .logout-container
      .logout-logo
        img(src="~assets/images/content/logo_color.svg", width="62", height="80")
      transition(name="route", mode="out-in")
        router-view
</template>

<script>
import auth from 'States/Auth.js'
import router from './../../router'

export default {
  name: 'Public',
  data () {
    return {
      email: null,
      password: null,
      error: false
    }
  },
  mounted () {
    if (auth.user.authenticated) {
      router.go('/')
    }
  },
  methods: {
  }
}
</script>
