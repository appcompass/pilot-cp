<template lang="pug">
  div.sidebar(
    v-if="allowed"
  )
    nav.sidebar-nav-container
      h3.sidebar-nav-heading(
      ) Some Title

      ul.sidebar-nav
        li(
          v-for="item in side_nav",
          :class="{'active': activeNav(item.url)}"
        )
          router-link(:to="{path: buildUrl(item.url)}")
            span.icon(:class="'icon-' + item.icon")
            | {{ item.title }}
</template>

<script>
import _ from 'lodash'
import RouteHandling from 'Mixins/RouteHandling'


export default {
  name: 'SideNavigation',
  mixins: [RouteHandling],
  data () {
    return {
      allowed: false
    }
  },
  computed: {
    side_nav ()  {
      return this.$store.getters.side_nav
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    // Note: on initial load, nav comes in after route.
    '$store.getters.main_nav' (nav) {
      this.subNavFrom(nav)
    },
    '$route' (to, from) {
      this.init()
    }
  },
  methods: {
    subNavFrom (nav) {
      let name = this.$route.name
      if (name) {
        let root = '/' + name.substring(0, name.indexOf('.'))
        this.$store.dispatch('nav.side.set', {url: root, full_nav: nav})
      }
    },
    init () {
      if (_.isEmpty(this.$route.params)) {
        this.$store.dispatch('nav.side.reset')
        this.allowed = false
      } else {
        this.subNavFrom(this.$store.getters.main_nav)
        this.allowed = true
      }
    }
  }
}
</script>
