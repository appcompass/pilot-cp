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
    div.footer-reports(v-html="debug_data")
</template>

<script>
export default {
  name: 'SiteFooter',
  data () {
    return {
      debug: true, // set this in the global app state via requests interceptor.
      debug_data: 'Footer Debug Output...'
    }
  }
}
</script>
