<template lang="pug">
  div.sidebar
    nav.sidebar-nav-container
      h3.sidebar-nav-heading {{ side_nav.title }}
      ul.sidebar-nav
        //- li(v-for="item in side_nav.children" :class="{'active': activeNav(item.url)}")
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
    nav() {
      return this.$store.getters.main_nav
    },
    side_nav() {
      return this.$store.getters.side_nav
    }
  },
  mounted() {
    // this.init()
  },
  watch: {
    // $route(to, from) {
    //   this.$store.dispatch('ROUTE_CHANGED', to)
    //   console.log(to.fullPath, from.fullPath)
    // }
  },
  methods: {
    // subNavFrom(nav) {
    //   let name = this.$route.name
    //   if (name) {
    //     let root = '/' + name.substring(0, name.indexOf('.'))
    //     this.$store.dispatch('nav.side.set', { url: root, full_nav: nav })
    //   }
    // },
    // init() {
    //   if (_.isEmpty(this.$route.params)) {
    //     this.$store.dispatch('nav.side.reset')
    //     this.allowed = false
    //   } else {
    //     this.subNavFrom(this.$store.getters.main_nav)
    //     this.allowed = true
    //   }
    // }
  }
}
</script>
