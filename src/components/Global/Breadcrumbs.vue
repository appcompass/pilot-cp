<template lang="pug">
  nav.breadcrumbs
    ul
      li(v-for="crumb in breadcrumbs")
        router-link(v-if="crumb.url", :to="crumb.url", v-text="crumb.title")
        span(v-else, v-text="crumb.title")
</template>

<script>
export default {
  name: 'Breadcrumbs',
  data () {
    return {
      breadcrumbs: [
        {
          'title': 'Dashboard',
          'url': '/'
        }
      ]
    }
  },
  methods: {
    init () {
      // @TODO: we need to make each crumb (except the last) a link
      // @TODO: look into fetching the middle value (ID: ) from the params that's returned
      // from the api call to populate the page resources.  Either that or have the API
      // provide a bread crumb name so we can use that instead of the ID.
      let segments = this.$route.fullPath.replace(/^\//, '').split('/')
      for (var i = 0; i < segments.length; i++) {
        let title = (i % 2) ? 'ID: ' + segments[i] : segments[i].toLowerCase().replace(/\b[a-z]/g, function (first) {
          return first.toUpperCase()
        })
        this.breadcrumbs.push({
          'title': title,
          'url': null
        })
      }
    }
  },
  computed: {
  },
  mounted () {
    this.init()
  }
}
</script>
