<template lang="jade">
div.columns
  .column.is-three-quarters
    h1.title.is-4 New: {{ $route.params.model.split('_')[$route.params.model.split('_').length - 1].replace(/s\s*$/, "") }}
    form
      FormBuilder(:form="create.fields", :content="collection", @input="set", :errros="errors", @clearErrors="clearErrors(create.fields)")

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
import FormBuilder from './FormBuilder'

export default {
  name: 'CreateView',
  components: { FormField, FormBuilder },
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
      // let vm = this
      var res
      function lookup (fieldname, fields, partcount) {
        // look up field.nested.name in fields
        if (partcount == null) {
          partcount = 0
        }
        let itemname = fieldname.split('.')[partcount]
        fields.forEach((item, index) => {
          if (item.name === itemname && item.fields.length) {
            res = lookup(fieldname, item.fields, partcount + 1)
          } else if (item.name === itemname && item.fields.length === 0) {
            res = item
          }
        })
        return res
      }
      let swalErrors = '<ul>'
      for (const key of Object.keys(errors)) {
        let obj = lookup(key, this.create.fields)
        this.$set(obj, 'errors', errors[key])
        errors[key].forEach((error) => {
          swalErrors += '<li>' + error + '</li>'
        })
      }
      swalErrors += '</ul>'
      swal({title: 'Validation Errors Dawg', text: swalErrors, html: true, type: 'error'})
    },
    clearErrors (fields) {
      if (!fields) {
        fields = this.create.fields
      }
      fields.forEach((field, index) => {
        this.$set(this.errors, [])
        this.$set(fields[index], 'errors', null)
        if (field.fields.length) {
          this.clearErrors(field.fields)
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
