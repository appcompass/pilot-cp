<template lang="pug">
  div.notifications-panel
    div.notifications-header
      h3.notifications-heading Notifications
      a.notifications-close
        span.icon icon-cancel
      form.notifications-search
        div.search-input
          span.icon-search
          input(type="search")
    div.notifications-category is-active
      h4.notifications-category-header
        | Users
        span.notifications-category-count 3
        span.notifications-category-toggle
      div.notifications-content
        div.notifications-item
          h5.notifications-item-type Login
          time.notifications-item-time 3 minutes ago
          p.notifications-item-message John Doe logged in.
        div.notifications-item
          h5.notifications-item-type Login
          time.notifications-item-time 3 minutes ago
          p.notifications-item-message John Doe logged in.
        div.notifications-item
          h5.notifications-item-type Login
          time.notifications-item-time 3 minutes ago
          p.notifications-item-message John Doe logged in.
    div.notifications-category
      h4.notifications-category-header
        | Media
        span.notifications-category-count 3
        span.notifications-category-toggle
      div.notifications-content
        div.notifications-item
          h5.notifications-item-type Login
          time.notifications-item-time 3 minutes ago
          p.notifications-item-message John Doe logged in.
        div.notifications-item
          h5.notifications-item-type Login
          time.notifications-item-time 3 minutes ago
          p.notifications-item-message John Doe logged in.
        div.notifications-item
          h5.notifications-item-type Login
          time.notifications-item-time 3 minutes ago
          p.notifications-item-message John Doe logged in.
</template>

<script>
export default {
  name: 'Notifications',
  data () {
    return {
    }
  }
}
</script>
