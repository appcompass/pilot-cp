<template lang="jade">
div

  .columns
    .column.is-10(v-if="data")
      div(:is="data.edit.editor + 'Editor'", :data="data", :errors="errors", @refresh="refresh", @clearErrors="clearErrors")

    .column.is-2(v-if="navigation && navigation.length")
      h1.menu-label Sub Navigation
      aside.menu
        ul.menu-list
          li(v-for="item in navigation")
            router-link(:to="{name: 'sub', params: {model: model.split('/')[model.split('/').length - 2], id: $route.params.id, sub: item.url.split('/')[item.url.split('/').length - 1]}}") {{ item.title }}

  .columns
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
      transition(:name="route", mode="out-in")
        router-view(name="sub")


</template>

<script>
import Auth from './Auth'
import State from './State'
import FormEditor from './Editors/FormEditor'
import MenuEditor from './Editors/MenuEditor'
import GalleryEditor from './Editors/GalleryEditor'

import swal from 'sweetalert'
// import _ from 'lodash'

export default {
  name: 'EditView',
  components: { FormEditor, MenuEditor, GalleryEditor },
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
    this.routeChanged()
  },
  watch: {
    '$route' (to, from) {
      this.routeChanged()
    }

  },
  methods: {
    routeChanged () {
      this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
      this.route = this.model.split('/')[this.model.split('/').length - 2]
      this.setNav(this.route)
      this.refresh()
    },
    setNav (route) {
      State.get(route)
        .then(subnav => {
          this.navigation = subnav
        }, (response) => {
          swal({title: 'Error', text: 'Can\'t fetch subnav', type: 'error'})
        })
    },
    update () {
      this.submitted = true
      this.$http.put(process.env.API_SERVER + this.$route.fullPath.split('_').join('/'), this.data.collection)
        .then((response) => {
          swal({title: 'Success', text: response.data.message, type: 'success'}, () => {
            this.refresh()
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
      this.data.edit.fields.forEach((field, index) => {
        if (errors[field.name]) {
          let error = errors[field.name]
          swalErrors += '<li>' + error + '</li>'
          this.errors.push(error)
          this.$set(this.data.edit.fields[index], 'errors', error)
        }
      })
      swalErrors += '</ul>'
      swal({title: 'Validation Errors Dawg', text: swalErrors, html: true, type: 'error'})
    },
    clearErrors () {
      this.data.edit.fields.forEach((field, index) => {
        this.$set(this.errors, [])
        this.$set(this.data.edit.fields[index], 'errors', null)
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
.route-enter-active
  transition: all .4s
  opacity: 1
.route-leave-active
  transition: all .2s
  opacity: 0
</style>
