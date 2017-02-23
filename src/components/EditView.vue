<template lang="jade">
div(v-if="!loading")
  div(:is="data.edit.editor + 'Editor'", :data="data", :errors="errors", @refresh="refresh")

  div.columns
    .column.is-10
      footer
        p.control
          .pull-right
            a.button.is-primary(
              :class="{'is-loading': loading}",
              :disable="submitted",
              @click.prevent="update"
            ) Save

  div.columns
    .column.is-12
      router-view


</template>

<script>
import Auth from './Auth'
import FormEditor from './Editors/FormEditor'
import MenuEditor from './Editors/MenuEditor'

import swal from 'sweetalert'
// import _ from 'lodash'

export default {
  name: 'EditView',
  components: { FormEditor, MenuEditor },
  data () {
    return {
      data: undefined,
      submitted: false,
      loading: true,
      model: undefined,
      route: undefined,
      navigation: undefined,
      errors: []
    }
  },
  created () {
    this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
    this.refresh()
  },
  watch: {
    '$route' (to, from) {
      this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
      this.refresh()
    }

  },
  methods: {
    update () {
      this.submitted = true
      this.$http.put(process.env.API_SERVER + this.$route.fullPath.split('_').join('/'), this.data.collection)
        .then((response) => {
          this.submitted = false
          swal({title: 'Success', text: response.data.message, type: 'success'}, () => {
            this.refresh()
          })
        }, response => {
          this.submitted = false
          if (response.status === 422) {
            this.data.edit.fields.forEach((field, index) => {
              this.errors.push(response.data)
              if (response.data[field.name]) {
                this.$set(this.data.edit.fields[index], 'errors', response.data[field.name])
              }
            })
          } else {
            swal({title: 'Error', text: response.data.errors, type: 'error'})
          }
        })
    },
    refresh () {
      var api = process.env.API_SERVER
      this.loading = true
      this.$http.get(api + this.model)
        .then((response) => {
          this.data = response.data
          this.loading = false
        }, (response) => {
          if (!Auth.user.authenticated) {
            return
          }
          swal({title: 'Error', text: response.data.errors, type: 'error'})
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/variables.sass'
.title
  text-transform: capitalize !important
.router-link-active
  color: $primary-color !important

</style>
