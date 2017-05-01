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
        li(v-for="cat in navigation")
          router-link(:to="cat.url" exact, :params="{current_user_id: user_id}", v-if="cat.url") {{ cat.title }}
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
import auth from 'States/Auth'
import NotificationsState from 'States/Notifications.js'

export default {
  name: 'HeadeRightNavigation',
  data () {
    return {
      auth: auth,
      user_id: undefined,
      notifications: NotificationsState
    }
  },
  methods: {
    logout () {
      auth.logout()
    }
  },
  watch: {
    'auth.user.profile' (profile) {
      if (profile) {
        this.user_id = profile.id
      }
    }
  },
  computed: {
    navigation ()  {
      return this.$store.getters.user_nav
    }
  },
  created () {
    auth.check()
  },
  mounted () {
    this.user_id = auth.user.profile.id
    NotificationsState.init()
  }
}
</script>
