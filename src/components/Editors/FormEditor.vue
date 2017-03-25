<template lang="pug">
  form
    div.row
      div.xsmall-9.medium-7.large-5.columns(
        v-if="!form.fields"
      )
        .hero-body
          .container
            h1.title Missing Form Editor View Form
            h2.subtitle List Form not provided, please provide one.
      div.xsmall-9.medium-7.large-5.columns(
        v-else
      )
        //- @TODO: this should display the record type and ID or something specific to this record.
        h1.title.is-4 Edit: {{ this.$route.fullPath.slice(0,-1).split('/').pop() }}
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
    this.model = this.$route.fullPath
  },
  methods: {
    set (data) {
      this.$emit('set', data)
    }
  }
}
</script>
