<template lang="pug">
  header.header
    div.header-logo
      router-link(to="/")
        img(src="~assets/images/content/logo.svg", width="26", height="34")
    nav.header-nav-container
      HeaderLeftNavigation
      HeaderRightNavigation
</template>

<script>
import HeaderLeftNavigation from './HeaderLeftNavigation'
import HeaderRightNavigation from './HeaderRightNavigation'

export default {
  name: 'SiteHeader',
  components: {
    HeaderLeftNavigation,
    HeaderRightNavigation
  },
  data () {
    return {
    }
  }
}
</script>
