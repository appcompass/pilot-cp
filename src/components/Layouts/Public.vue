<template lang="pug">
  .site-logout
    .logout-container
      .logout-logo
        img(:src="logo", width="62", height="80")
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
      // @TODO: Make dynamic where we can upload/set the photo for the CP.
      // During install maybe? I really don't think we need an api call for this
      // unless we have a bunch of other config stuff included.
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
