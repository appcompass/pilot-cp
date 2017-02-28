<template lang="jade">
div.columns
  .column.is-three-quarters
    h1.title.is-4 New: {{ $route.params.model.split('_')[$route.params.model.split('_').length - 1].replace(/s\s*$/, "") }}
    form
      FormBuilder(
        :form="create.fields",
        :content="collection",
        :errors="errors",
        @input="set"
      )

    footer
      .pull-right
          a.button(@click="$router.go(-1)") Cancel
          a.button.is-primary(@click="save") Save

  .column.is-one-quarter
</template>

<script>
import swal from 'sweetalert'
import _ from 'lodash'

import * as Components from './Components'
import FormField from './FormBuilder/FormField'
import FormBuilder from './FormBuilder'
import Errors from './Errors'

export default {
  name: 'CreateView',
  components: { FormField, FormBuilder },
  data () {
    return {
      Components,
      create: {},
      collection: {},
      errors: new Errors()
    }
  },
  created () {
    var api = process.env.API_SERVER

    this.model = this.$route.params.model.split('_').join('/')

    this.$http.get(api + this.model)
      .then((response) => {
        this.create = response.data.edit
        this.resource = this.$resource(api + this.model)
      })
  },
  methods: {
    set (data) {
      this.clearErrors()
      _.set(this.collection, data.pointer, data.value)
    },
    value (fieldName) {
      return _.get(this.collection, fieldName)
    },
    save () {
      this.resource.save(this.collection)
        .then((response) => {
          swal({title: 'Success', text: response.data.message, type: 'success'
          }, () => {
            this.$router.push({name: 'edit', params: { model: response.data.model, id: response.data.id }})
          })
        }, response => {
          if (response.status === 422) {
            let errors = new Errors()
            errors.set(response.data)
            this.$nextTick(() => {
              this.errors = Object.create(errors)
            })
          } else {
            swal({title: 'Error', text: response.data.errors, type: 'error'})
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>
  .title
    text-transform: capitalize !important
</style>
