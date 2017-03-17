<template lang="jade">
footer.footer
  .container
    .content.has-text-centered
      p Built with
        span.icon.is-small
          i.fa.fa-heart
        |  by
        a(href="https://www.p3in.com")  Plus Three Interactive.
      p ©
        a(href="https://www.p3in.com")  Plus Three Interactive, LLC.
        |  All Rights Reserved.
      p
        a.icon(href="https://github.com/plus3interactive/")
          i.fa.fa-github
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>

<style lang="sass" scoped>
i.fa.fa-heart
  color: red
</style>
