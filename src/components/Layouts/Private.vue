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
          transition(name="fade", mode="out-in")
            router-view
      SiteFooter
  Modal
</template>

<script>
import SiteHeader from 'components/Global/SiteHeader'
import SiteFooter from 'components/Global/SiteFooter'
import SideNavigation from 'components/Global/SideNavigation'
import Notifications from 'components/Global/Notifications'
import Breadcrumbs from 'components/Global/Breadcrumbs'
import Modal from 'components/Global/Modal'

export default {
  name: 'Private',
  data: () =>  ({
    lockTimeout: undefined
  }),
  mounted () {
    this.$el.addEventListener('mousemove', () => {
      clearTimeout(this.lockTimeout)
      this.lockTimeout = setTimeout(() => this.$store.dispatch('modal.show', {
        type: 'LockScreen',
        css: 'lock-screen-modal-container',
        canClose: false
      }), 60 * 5 * 1000) // 5 minutes lock
    })
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
