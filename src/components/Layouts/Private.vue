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
import SiteHeader from 'components/Global/SiteHeader'
import SiteFooter from 'components/Global/SiteFooter'
import SideNavigation from 'components/Global/SideNavigation'
import Notifications from 'components/Global/Notifications'
import Breadcrumbs from 'components/Global/Breadcrumbs'
import ModalComponent from 'components/Global/ModalComponent'

export default {
  name: 'Private',
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
  },
  watch: {
  },
  methods: {
  }
}
</script>
