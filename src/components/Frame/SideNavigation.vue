<template lang="pug">
  div.sidebar(
    v-if="navigation.full"
  )
    nav.sidebar-nav-container(
      v-for="cat in navigation.full",
    )

      h3.sidebar-nav-heading(
        v-if="!cat.url"
      ) {{ cat.title }}

      ul.sidebar-nav(
        v-if="cat.children"
      )
        li(
          v-for="item in cat.children",
          :class="{'active': false}"
        )
          //- router-link(:to="{name: 'sub', params: {model: navigation.left.model.split('/')[navigation.left.model.split('/').length - 2], id: $route.params.id, sub: item.url.split('/')[item.url.split('/').length - 1]}}")
          router-link(:to="item.url")
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
