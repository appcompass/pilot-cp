<template lang="pug">
  form
    div.row
      div.xsmall-12.columns(
        v-if="!form.fields"
      )
        .hero-body
          .container
            h1.title Missing Form Editor View Form
            h2.subtitle List Form not provided, please provide one.
      div.xsmall-12.columns(
        v-else
      )
        //- @TODO: this should display the record type and ID or something specific to this record.
        h1.title.is-4 Edit: {{ this.$route.fullPath.slice(0,-1).split('/').pop() }}
        .row
          .xsmall-12.columns
            FormBuilder(:form="form")
</template>

<script>
export default {
  name: 'FormEditor',
  props: ['form'],
  data() {
    return {
      resource: undefined,
      loading: false,
      model: undefined,
      route: undefined,
      visible: true
    }
  },
  created() {
    this.model = this.$route.fullPath
  },
  methods: {
    set(data) {
      this.$emit('set', data)
    }
  }
}
</script>
