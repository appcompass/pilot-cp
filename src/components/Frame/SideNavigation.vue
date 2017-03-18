<template lang="pug">
  div.sidebar(
    v-if="navigation.left_nav"
  )
    nav.sidebar-nav-container
      h3.sidebar-nav-heading Sub Navigation
      ul.sidebar-nav
        li(
          v-for="item in navigation.left_nav.nav",
          :class="{'active': false}"
        )
          //- router-link(:to="item.url")
          router-link(:to="{name: 'sub', params: {model: navigation.left_nav.model.split('/')[navigation.left_nav.model.split('/').length - 2], id: $route.params.id, sub: item.url.split('/')[item.url.split('/').length - 1]}}")
            span.icon(:class="'icon-' + item.icon")
            | {{ item.title }}
</template>

<script>
import Navigation from './../States/Navigation'

export default {
  name: 'SideNavigation',
  data () {
    return {
      navigation: Navigation
    }
  }
}
</script>
