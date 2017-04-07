<template lang="pug">
  div.notifications-panel(
    v-if="notifications && auth.user.authenticated",
    :class="{'is-active': notifications.is_open}"
  )
    div.notifications-header
      h3.notifications-heading Notifications
      a.notifications-close(
        @click="notifications.toggleView()"
      )
        span.icon.icon-cancel
      form.notifications-search
        div.search-input
          span.icon-search
          input(type="search")

    div.notifications-category(
      v-for="(group, name) in notifications.full",
      :class="{'is-active': !group.closed}"
    )
      h4.notifications-category-header
        | {{name}}
        span.notifications-category-count(v-text="group.items.length")
        span.notifications-category-toggle(
          v-on:click="toggleGroup(group)"
        )
      div.notifications-content
        div.notifications-item(
          v-for="row in group.items"
        )
          h5.notifications-item-type(v-text="row.type")
          time.notifications-item-time(v-moment-ago="row.time")
          p.notifications-item-message(v-text="row.message")
</template>

<script>
import auth from 'States/Auth'
import NotificationsState from 'States/Notifications.js'

export default {
  name: 'Notifications',
  data () {
    return {
      notifications: NotificationsState,
      auth: auth
    }
  },
  methods: {
    init () {
      NotificationsState.init()
    },
    toggleGroup (group) {
      this.$set(group, 'closed', !group.closed)
    }
  },
  computed: {

  },
  mounted () {
    this.init()
  }
}
</script>
