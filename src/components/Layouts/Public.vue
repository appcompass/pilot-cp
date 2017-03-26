<template lang="pug">
  .site-logout
    .logout-container
      .logout-logo
        img(:src="logo", width="62", height="80")
      transition(name="route", mode="out-in")
        router-view
</template>

<script>
import auth from './../../States/Auth.js'
import router from './../../router'

export default {
  name: 'Public',
  data () {
    return {
      logo: 'http://admin.triton.com.dev/templates/assets/images/logo_color.svg',
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
