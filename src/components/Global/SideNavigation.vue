<template lang="pug">
  div.sidebar(
    v-if="nav && allowed"
  )
    nav.sidebar-nav-container
      h3.sidebar-nav-heading(
      ) Some Title

      ul.sidebar-nav
        li(
          v-for="item in nav",
          :class="{'active': activeNav(item.url)}"
        )
          //- router-link(:to="{name: 'sub', params: {model: navigation.left.model.split('/')[navigation.left.model.split('/').length - 2], id: $route.params.id, sub: item.url.split('/')[item.url.split('/').length - 1]}}")
          router-link(:to="{path: buildUrl(item.url)}")
            span.icon(:class="'icon-' + item.icon")
            | {{ item.title }}
</template>

<script>
import _ from 'lodash'
import Navigation from 'States/Navigation'
import RouteHandling from 'Mixins/RouteHandling'


export default {
  name: 'SideNavigation',
  mixins: [RouteHandling],
  data () {
    return {
      nav: undefined,
      allowed: false
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.set()
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  },
  methods: {
    init () {
      if (_.isEmpty(this.$route.params)) {
        this.nav = undefined
        this.allowed = false
      } else {
        this.set()
        this.allowed = true
      }
    },
    set () {
      let name = this.$route.name
      if (name) {
        let root = '/' + name.substring(0, name.indexOf('.'))
        Navigation.get(root).then(branch => {
          this.nav = branch
        })
      }
    },
    current (item) {
      return this.$route.fullPath === item.url
    }
  }
}
</script>
