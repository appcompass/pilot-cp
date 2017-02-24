<template lang="jade">
div.columns
  .column.is-three-quarters
    h1.title.is-4 New: {{ $route.params.model.split('_')[$route.params.model.split('_').length - 1].replace(/s\s*$/, "") }}
    form
      FormField(v-for="field in create.fields", :field="field", :value="value(field.name)")

    footer
      .pull-right
          a.button(@click="$router.go(-1)") Cancel
          a.button.is-primary(@click="save") Save

  .column.is-one-quarter
</template>

<script>
import * as Components from './Components'
import swal from 'sweetalert'
import FormField from './FormBuilder/FormField'
import _ from 'lodash'

export default {
  name: 'CreateView',
  components: { FormField },
  data () {
    return {
      Components,
      create: {},
      collection: {},
      errors: []
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
            this.setErrors(response.data)
          } else {
            swal({title: 'Error', text: response.data.errors, type: 'error'})
          }
        })
    },
    setErrors (errors) {
      // this.$set(this.errors, errors)
      let swalErrors = '<ul>'
      this.create.fields.forEach((field, index) => {
        if (errors[field.name]) {
          let error = errors[field.name]
          swalErrors += '<li>' + error + '</li>'
          this.errors.push(error)
          this.$set(this.create.fields[index], 'errors', error)
        }
      })
      swalErrors += '</ul>'
      swal({title: 'Validation Errors Dawg', text: swalErrors, html: true, type: 'error'})
    },
    clearErrors () {
      this.create.fields.forEach((field, index) => {
        this.$set(this.errors, [])
        this.$set(this.create.fields[index], 'errors', null)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .title
    text-transform: capitalize !important
</style>
