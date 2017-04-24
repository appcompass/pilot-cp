<template lang="pug">
  div#app
    div(
      v-if="!loading && Layouts[layout]",
      :is="Layouts[layout]"
    )
    .site-logout(v-else)
      .logout-container
        .logout-logo
          img(src="~assets/images/content/p3_logo-01.png", width="62", height="80")
        .logout-box
          center
            | Loading please wait!
</template>

<script>
import auth from 'States/Auth.js'
import * as Layouts from './Layouts'

export default {
  name: 'Main',
  data () {
    return {
      Layouts,
      loading: true,
      auth: auth,
      layout: 'Public'
    }
  },
  components: {},
  created () {
    this.init()
  },
  mounted () {
    if (this.layout === 'Public') {
      this.loading = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.init()
    },
    'auth.user.authenticated' (val) {
      this.check(val)
    },
    layout (val) {
      if (val) {
        this.loading = false
      }
    }
  },
  methods: {
    init () {
      auth.check(user => {
        this.check(user)
      })
    },
    check (val) {
      if (val) {
        let name = this.$route.name
        if (name) {
          // Elaboriate, but allows us to add pages by their route names as need be.
          name = name.charAt(0).toUpperCase() + name.replace(/\.([a-z])/g, function (g) { return g[1].toUpperCase() }).slice(1)
          if (Layouts[name]) {
            // this.layout = 'Private'
            this.layout = name
          } else {
            this.layout = 'Private'
          }
        } else {
          this.layout = 'Public'
        }
      } else {
        this.layout = 'Public'
      }
    }
  }
}
</script>
