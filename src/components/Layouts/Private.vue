<template lang="pug">
.site
  SiteHeader
  .content-container
    SideNavigation
    Notifications
    .main-container
      main.main
        .row
          .xsmall-12.columns
            Breadcrumbs
        .row
          transition(name="route", mode="out-in")
            router-view
      SiteFooter
  Modal
</template>

<script>
import NavigationState from 'States/Navigation'
import SiteHeader from 'components/Global/SiteHeader'
import SiteFooter from 'components/Global/SiteFooter'
import SideNavigation from 'components/Global/SideNavigation'
import Notifications from 'components/Global/Notifications'
import Breadcrumbs from 'components/Global/Breadcrumbs'
import Modal from 'components/Global/Modal'

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
    Modal
  }
}
</script>
