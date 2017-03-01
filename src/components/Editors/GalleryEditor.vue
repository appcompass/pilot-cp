<template lang="jade">
div
  h1.title.is-5 Gallery: {{ data.collection.name }}
    a.button.is-pulled-right(@click="$router.go(-1)")
      span.icon.is-small
        span.fa.fa-angle-left
      .span Back
  FormBuilder(:form="data.edit.fields", :content="data.collection", :errors="errors")
  pre
    | {{ data }}
</template>

<script>
import FormBuilder from '../FormBuilder'

export default {
  name: 'GalleryEditor',
  props: ['data', 'errors'],
  components: { FormBuilder },
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">

</style>
