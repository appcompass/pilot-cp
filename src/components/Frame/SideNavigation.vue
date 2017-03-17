<template lang="pug">
  div.sidebar
    nav.sidebar-nav-container(v-for="cat in navigation.full")
      h3.sidebar-nav-heading {{ cat.title }}
      ul.sidebar-nav
        li.active(v-for="item in cat.children")
          span.icon(:class="'icon-' + item.icon")
          router-link(:to="item.url") {{ item.title }}
</template>

<script>
import Navigation from './../State'

export default {
  name: 'SideNavigation',
  data () {
    return {
      navigation: Navigation
    }
  }
}
</script>
