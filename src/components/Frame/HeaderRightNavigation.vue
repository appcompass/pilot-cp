<template lang="pug">
  ul.header-nav.header-nav-secondary(v-if="auth.user.authenticated")
    li
      div.header-search
        div.search-input
          span.icon-search
          input(type="search")
    li
      a
        span.header-profile
          img(:src="auth.user.profile.gravatar_url", width="40px", height="40px")
      ul
        li
          router-link(to="") Profile
        li
          a(@click="auth.logout()") Logout
    li
      a.notifications-toggle(
        @click="notifications.toggleView()",
        :class="{'is-active': notifications.is_open}"
      )
        span.header-notifications.icon-notification
          span.alert-count(v-text="notifications.count")
</template>

<script>
import auth from './../Auth.js'
import NotificationsState from './../States/Notifications.js'

export default {
  name: 'HeadeRightNavigation',
  data () {
    return {
      notifications: NotificationsState,
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
    NotificationsState.init()
  }
}
</script>
