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
        div(v-if="company.available", v-for="comp in company.available")
          li(v-if="comp.id != company.current.id")
            a(href="#", @click="setCompany(comp.id)")
              small {{ comp.name }}
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
import NotificationsState from 'States/Notifications.js'

export default {
  name: 'HeadeRightNavigation',
  data() {
    return {
      notifications: NotificationsState
    }
  },
  methods: {
    setCompany(id) {
      this.$store.dispatch('SET_COMPANY', { id: id })
    }
  },
  computed: {
    user_id() {
      return this.$store.getters.user.id
    },
    authenticated() {
      return this.$store.getters.authenticated
    },
    navigation() {
      return this.$store.getters.user_nav
    },
    user() {
      return this.$store.getters.user
    },
    company() {
      return this.$store.getters.company
    }
  },
  mounted() {
    NotificationsState.init()
  }
}
</script>
