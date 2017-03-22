<template lang="pug">
  footer.footer
    div.footer-company
      p
        = "Built with "
        span.icon-heart
        = " by "
        a(href="https://www.plus3interactive.com") Plus 3 Interactive
        = ". "
        br
        | &copy;
        = " "
        a(href="https://www.plus3interactive.com") Plus 3 Interactive, LLC
        | . All Rights Reserved
      p.footer-icons
        a.link-icon(href="https://github.com/plus3interactive/")
          span.icon-github
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
