<template lang="pug">
  div.site
    SiteHeader
    div.content-container
      SideNavigation
      Notifications
      div.main-container
        main.main
          div.row
            div.xsmall-12.columns
              Breadcrumbs
          div.row
            transition(name="route", mode="out-in")
              router-view
        SiteFooter
</template>

<script>
import NavigationState from 'States/Navigation'
import SiteHeader from './../Global/SiteHeader'
import SiteFooter from './../Global/SiteFooter'
import SideNavigation from './../Global/SideNavigation'
import Notifications from './../Global/Notifications'
import Breadcrumbs from './../Global/Breadcrumbs'
import ModalComponent from './../Global/ModalComponent'

export default {
  name: 'PrivateNormal',
  data () {
    return {
      // model: undefined,
      // route: undefined
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
    SideNavigation,
    Notifications,
    Breadcrumbs,
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
      this.axios.interceptors.response.use(function (response) {
        if (response.data.api_url) {
          NavigationState.setApiUrl(response.data.api_url)
        }
        return response
      })
      // this.model = this.$route.fullPath
      // this.route = this.$route.fullPath.split('/')
      // if (this.$route.params.model) {
      //   this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
      //   this.route = this.model.split('/')[this.model.split('/').length - 2]
      // }
    }
  }
}
</script>
