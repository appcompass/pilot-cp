<template lang="pug">
  ul.header-nav.header-nav-primary
    li(v-for="cat in navigation.full")
      router-link(:to="cat.url" exact, v-if="cat.url") {{ cat.title }}
      a(v-if="!cat.url") {{ cat.title }}
      ul(v-if="cat.children")
        li(v-for="item in cat.children")
          router-link(:to="item.url") {{ item.title }}
</template>

<script>
import Navigation from './../State'

export default {
  name: 'HeaderLeftNavigation',
  data () {
    return {
      navigation: Navigation
    }
  },
  created () {
  },
  mounted () {
  },
  updated () {
  }
}
</script>
