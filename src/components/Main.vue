<template lang="jade">
  div#app.site
    SiteHeader
    div.content-container
      SideNavigation
      Notifications
      div.main-container
        main.main
          transition(name="route", mode="out-in")
            router-view
        SiteFooter
</template>

<script>
import NavigationState from './States/Navigation'
import SiteHeader from './Frame/SiteHeader'
import SiteFooter from './Frame/SiteFooter'
import SideNavigation from './Frame/SideNavigation'
import Notifications from './Frame/Notifications'
import ModalComponent from './ModalComponent'

export default {
  name: 'Main',
  data () {
    return {
      model: undefined,
      route: undefined
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
    SideNavigation,
    Notifications,
    ModalComponent
  },
  created () {
    this.routeChanged()
  },
  watch: {
    '$route' (to, from) {
      this.routeChanged()
    }
  },
  methods: {
    routeChanged () {
      if (this.$route.params.model) {
        NavigationState.setCurrent(this.$route.params)
        this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
        this.route = this.model.split('/')[this.model.split('/').length - 2]
      }
    }
  }
}
</script>
