<template lang="jade">
div.columns
  .column.is-three-quarters
    h1.title.is-4 New: {{ $route.params.model.split('_')[$route.params.model.split('_').length - 1].replace(/s\s*$/, "") }}
    form
      FormBuilder(
        :form="form",
        @set="set"
      )

    footer
      .pull-right
          a.button(@click="$router.go(-1)") Cancel
          a.button.is-primary(@click="save") Save

  .column.is-one-quarter
</template>

<script>
import swal from 'sweetalert'

import * as Components from './Components'
import FormBuilder from './FormBuilder'
import Form from './Helpers/Form'

export default {
  name: 'CreateView',
  components: { FormBuilder },
  data () {
    return {
      Components,
      form: new Form()
    }
  },
  created () {
    var api = process.env.API_SERVER
    this.model = this.$route.params.model.split('_').join('/')
    this.$http.get(api + this.model)
      .then((response) => {
        this.form.init(response.data.edit)

        this.create = response.data.edit // @TODO created same as edit? -f
        this.resource = this.$resource(api + this.model)
      })
  },
  methods: {
    set (data) {
      this.form.set(data)
    },
    save () {
      this.resource.save(this.form.collection)
        .then((response) => {
          swal({title: 'Success', text: response.data.message, type: 'success'
          }, () => {
            this.$router.push({name: 'edit', params: { model: this.model, id: response.data.id }})
          })
        }, response => {
          if (response.status === 422) {
            this.form.fails(response.data)
          } else if (response.status !== 403) {
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
