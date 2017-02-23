<template lang="jade">
div(v-if="!loading")
  div(:is="data.edit.editor + 'Editor'", :data="data", :errors="errors", @refresh="refresh")

  div.columns
    .column.is-12
      router-view

  footer
    p.control
      .pull-right
        a.button.is-primary(
          :class="{'is-loading': loading}",
          :disable="loading",
          @click="update"
        ) Save
</template>

<script>
// import * as Components from './Components'
// import State from './State'
import Auth from './Auth'
import FormEditor from './Editors/FormEditor'
import MenuEditor from './Editors/MenuEditor'

import swal from 'sweetalert'
import _ from 'lodash'

export default {
  name: 'EditView',
  components: { FormEditor, MenuEditor },
  data () {
    return {
      // Components,
      data: undefined,
      resource: undefined,
      edit: {},
      collection: undefined,
      loading: true,
      model: undefined,
      route: undefined,
      navigation: undefined,
      // @TODO make errors a computed property?
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
    },
    set (data) {
      this.$set(this.collection, data.pointer, data.value)
      if (this.errors != null) {
        this.clearErrors()
      }
    },
    value (fieldName) {
      return _.get(this.collection, fieldName)
    },
    update () {
    //   this.loading = true
    //   this.$http.put(process.env.API_SERVER + this.$route.fullPath.split('_').join('/'), this.collection)
    //     .then((response) => {
    //       this.loading = false
    //       swal({title: 'Success', text: response.data.message, type: 'success'}, () => {
    //         // fetch a fresh copy of the resource just updated
    //         this.refresh()
    //       })
    //     }, response => {
    //       this.loading = false
    //       if (response.status === 422) {
    //         this.edit.fields.forEach((field, index) => {
    //           this.errors = response.data
    //           if (response.data[field.name]) {
    //             this.$set(this.edit.fields[index], 'errors', response.data[field.name])
    //           }
    //         })
    //       } else {
    //         swal({title: 'Error', text: response.data.errors, type: 'error'})
    //       }
    //     })
    // },
    // clearErrors () {
    //   this.edit.fields.forEach((field, index) => {
    //     this.$set(this.edit.fields[index], 'errors', null)
    //   })
    //   this.errors = null
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
