<template lang="pug">
footer.footer
  .row
    .xsmall-12.columns
      .footer-company
        .row
          .xsmall-5.columns
            p
              = "Built with "
              span.icon-heart
              = " by "
              a(href="https://www.plus3interactive.com") Plus 3 Interactive
              | .
          .xsmall-2.columns.text-center
            p.footer-icons
              a.link-icon(href="https://github.com/plus3interactive/")
                span.icon-github
          .xsmall-5.columns.text-right
            p &copy; Plus 3 Interactive, LLC. All Rights Reserved
      pre.footer-reports(
        v-if="debug.length",
        v-html="debug"
      )
</template>

<script>
export default {
  name: 'SiteFooter',
  data () {
    return {
      debug: []
    }
  },
  watch: {
    // @TODO: there are better ways to do this, we also want all requests
    // and the ability to clear the log via button click.
    '$route' (to, from) {
      let vm = this
      vm.debug = []
      this.axios.interceptors.response.use(function (response) {
        if (response.data.debug) {
          vm.debug.push({
            endpoint: response.config.url,
            status: response.status,
            headers: response.headers,
            debug: response.data.debug
          })
        }
        return response
      })
    }
  },
  created () {
  }
}
</script>
