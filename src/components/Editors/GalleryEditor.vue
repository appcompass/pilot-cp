<template lang="jade">
div
  h1.title.is-5 Gallery: {{ data.collection.name }}
    a.button.is-pulled-right(@click="$router.go(-1)")
      span.icon.is-small
        span.fa.fa-angle-left
      .span Back

  pre
    | {{ data }}
</template>

<script>
export default {
  name: 'GalleryEditor',
  props: ['data', 'errors']
}
</script>

<style lang="sass">

</style>
