<template lang="pug">
nav.breadcrumbs
  ul
    li(v-for="crumb in breadcrumbs")
      router-link(v-if="crumb.url", :to="crumb.url") {{ crumb.label }}
      span(v-else) {{ crumb.label }}
</template>

<script>
import RouteHandling from 'Mixins/RouteHandling'
import Utils from 'Helpers/Utils'

export default {
  name: 'Breadcrumbs',
  computed: {
    breadcrumbs() {
      return this.$store.getters.breadcrumbs
    }
  }
}
</script>
