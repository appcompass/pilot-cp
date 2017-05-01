<template lang="pug">
  .site-logout
    .logout-container
      .logout-logo
        img(src="~assets/images/content/logo_color.svg", width="62", height="80")
      transition(name="fade", mode="out-in")
        router-view
</template>

<script>
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
  },
  methods: {
  }
}
</script>
