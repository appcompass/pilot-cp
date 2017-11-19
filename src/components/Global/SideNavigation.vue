<template lang="pug">
  div.sidebar(v-if="side_nav.children")
    nav.sidebar-nav-container
      h3.sidebar-nav-heading {{ side_nav.title }}
      ul.sidebar-nav
        li(v-for="item in side_nav.children")
          a(:href="item.url")
            span.icon(:class="'icon-' + item.icon") {{ item.title }}
</template>

<script>
import RouteHandling from 'Mixins/RouteHandling'

export default {
  name: 'SideNavigation',
  mixins: [RouteHandling],
  computed: {
    side_nav() {
      return this.$store.getters.side_nav
    }
  }
}
</script>
