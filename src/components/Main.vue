<template lang="jade">
  div#app.site
    SiteHeader
    div.main-container
      SideNavigation
      Notifications
      main.main
        transition(name="route", mode="out-in")
          router-view
    SiteFooter
</template>

<script>
import SiteHeader from './Frame/SiteHeader'
import SiteFooter from './Frame/SiteFooter'
import SideNavigation from './Frame/SideNavigation'
import Notifications from './Frame/Notifications'
import ModalComponent from './ModalComponent'

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
    SideNavigation,
    Notifications,
    ModalComponent
  }
}
</script>
