<template lang="jade">
div
  div.columns
    .column.hero.is-danger(v-if="!form.fields")
      .hero-body
        .container
          h1.title Missing List View Form
          h2.subtitle List Form not provided, please provide one.

    .column.is-12(v-else)
      h1.title.is-4 Edit: {{ $route.params.model.split('_').pop() }}
        span.icon.is-small(@click="visible = !visible")
          i.icon.fa.fa-minus-square(v-if="visible")
          i.icon.fa.fa-plus-square(v-else)
        a.button.is-pulled-right(@click="$router.go(-1)")
          span.icon.is-small
            span.fa.fa-angle-left
          .span Back

      .section(v-if="visible")
        FormBuilder(:form="form", @set="set")
</template>

<script>
import * as Components from '../Components'
import FormField from '../FormBuilder/FormField'
import FormBuilder from '../FormBuilder'

export default {
  name: 'FormEditor',
  props: ['form'],
  components: { FormField, FormBuilder },
  data () {
    return {
      Components,
      resource: undefined,
      loading: false,
      model: undefined,
      route: undefined,
      visible: true
    }
  },
  created () {
    this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
  },
  methods: {
    set (data) {
      this.$emit('set', data)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/variables.sass'
.title
  text-transform: capitalize !important
.router-link-active
  color: $primary-color !important

</style>
