<template lang="pug">
  ul.header-nav.header-nav-secondary
    li
      div.header-search
        div.search-input
          span.icon-search
          input(type="search")
    li
      a
        span.header-profile
          img(v-if="auth.user.authenticated", :src="auth.user.profile.gravatar_url", width="40px", height="40px")
      ul
        li(v-if="auth.user.authenticated")
          router-link(to="") Profile
        li
          a.nav-item.is-tab(v-if="auth.user.authenticated", @click="auth.logout()") Logout
    li
      router-link.notifications-toggle(to="")
        span.header-notifications.icon-notification
          span.alert-count
            | 10
</template>

<script>
import auth from './../Auth.js'

export default {
  name: 'HeadeRightNavigation',
  data () {
    return {
      auth: auth
    }
  },
  methods: {
    logout () {
      auth.logout()
    }
  },
  mounted () {
    auth.check()
  }
}
</script>
