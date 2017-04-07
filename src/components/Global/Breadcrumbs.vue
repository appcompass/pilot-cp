<template lang="pug">
  nav.breadcrumbs
    ul
      li(v-for="crumb in breadcrumbs")
        router-link(v-if="crumb.url", :to="crumb.url", v-text="crumb.title")
        span(v-else, v-text="crumb.title")
</template>

<script>
import RouteHandling from 'Mixins/RouteHandling'
import Utils from 'Helpers/Utils'

export default {
  name: 'Breadcrumbs',
  mixins: [RouteHandling],
  data () {
    return {
      breadcrumbs: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  },
  methods: {
    init () {
      this.breadcrumbs = [{
        'title': 'Dashboard',
        'url': '/'
      }];

      const tree = this.$route.matched
      const cats = this.getRouteName().split('.')
      let catUrl = ''
      for (let i in tree) {
        if (cats[i]) {
          catUrl = catUrl + '/' + cats[i]
          this.breadcrumbs.push({
            'title': Utils.ucWords(cats[i]),
            'url': catUrl
          })
          catUrl = catUrl + '/' + this.$route.params[cats[i]]
        }
        this.breadcrumbs.push({
          // @TODO: next step is to create an intersector that overwirtes the title with the record name
          // maybe make records use a "Breadcrumbable" Trait to maintain a consistent API
          'title': tree[i].meta.title,
          'url': parseInt(i) === tree.length-1 ? null : this.buildUrl(tree[i].path)
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
