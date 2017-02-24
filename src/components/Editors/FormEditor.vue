<template lang="jade">
div
  div.columns
    .column.hero.is-danger(v-if="!data.edit")
      .hero-body
        .container
          h1.title Missing List View Form
          h2.subtitle List Form not provided, please provide one.

    .column.is-12(v-else)
      h1.title.is-4 Edit: {{ $route.params.model.split('_').pop() }}
        a.button.is-pulled-right(@click="$router.go(-1)")
          span.icon.is-small
            span.fa.fa-angle-left
          .span Back

      .section
        span(
          v-for="field in data.edit.fields",
          :is="Components[field.type]",
          :pointer="field.name",
          :data="value(field.name)",
          :source="field.source",
          :label="field.label",
          :errors="field.errors"
          @input="set"
        )
</template>

<script>
import * as Components from '../Components'

import _ from 'lodash'

export default {
  name: 'FormEditor',
  props: ['data', 'errors'],
  data () {
    return {
      Components,
      resource: undefined,
      loading: false,
      model: undefined,
      route: undefined
    }
  },
  created () {
    this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
  },
  methods: {
    set (data) {
      this.$set(this.data.collection, data.pointer, data.value)
      if (this.errors != null) {
        this.clearErrors()
      }
    },
    value (fieldName) {
      return _.get(this.data.collection, fieldName)
    },
    clearErrors () {
      this.data.edit.fields.forEach((field, index) => {
        this.$set(this.data.edit.fields[index], 'errors', null)
      })
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
