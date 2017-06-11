<template lang="pug">
  ul.header-nav.header-nav-secondary(v-if="authenticated")
    li
      div.header-search
        div.search-input
          span.icon-search
          input(type="search")
    li
      a
        span.header-profile
          img(:src="user.gravatar_url", width="40px", height="40px")
      ul
        li(v-for="cat in navigation")
          router-link(:to="cat.url" exact, :params="{current_user_id: user_id}", v-if="cat.url") {{ cat.title }}
        li
          a(@click="$store.dispatch('LOGOUT')") Logout
    li
      a.notifications-toggle(
        @click="notifications.toggleView()",
        :class="{'is-active': notifications.is_open}"
      )
        span.header-notifications.icon-notification
          span.alert-count(v-text="notifications.count")
</template>

<script>
// import auth from 'States/Auth'
import NotificationsState from 'States/Notifications.js'

export default {
  name: 'HeadeRightNavigation',
  data () {
    return {
      // auth: auth,
      // user_id: undefined,
      notifications: NotificationsState
    }
  },
  methods: {
    // logout () {
      // this.$store.dispatch('LOGOUT')
      // auth.logout()
    // }
  },
  // watch: {
  //   'auth.user.profile' (profile) {
  //     if (profile) {
  //       this.user_id = profile.id
  //     }
  //   }
  // },
  computed: {
    user_id () {
      return this.$store.getters.user.id
    },
    authenticated () {
      return this.$store.getters.authenticated
    },
    navigation () {
      return this.$store.getters.user_nav
    },
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    NotificationsState.init()
  }
}
</script>
