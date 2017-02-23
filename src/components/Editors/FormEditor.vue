<template lang="jade">
div
  div.columns
    .column.hero.is-danger(v-if="!data.edit")
      .hero-body
        .container
          h1.title Missing List View Form
          h2.subtitle List Form not provided, please provide one.

    .column(v-else, :class="{'is-8': navigation && navigation.length, 'is-10': !navigation || !navigation.length}")
      h1.title.is-4 Edit: {{ $route.params.model.split('_').pop() }}
        a.button.is-pulled-right(@click="$router.go(-1)")
          span.icon.is-small
            span.fa.fa-angle-left
          .span Back

      .section
        form
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

    .column.is-3.is-offset-1(v-if="navigation && navigation.length")
      h1.menu-label Sub Navigation
      aside.menu
        ul.menu-list
          li(v-for="item in navigation")
            router-link(:to="{name: 'sub', params: {model: model.split('/')[model.split('/').length - 2], id: $route.params.id, sub: item.url.split('/')[item.url.split('/').length - 1]}}") {{ item.title }}

  div.columns
    .column.is-12
      router-view

</template>

<script>
import * as Components from '../Components'
import State from '../State'
// import Auth from '../Auth'

import swal from 'sweetalert'
import _ from 'lodash'

export default {
  name: 'FormEditor',
  props: ['data', 'errors'],
  data () {
    return {
      Components,
      resource: undefined,
      // edit: {},
      // collection: undefined,
      loading: false,
      model: undefined,
      route: undefined,
      navigation: undefined
      // @TODO make errors a computed property?
      // errors: null
    }
  },
  created () {
    this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
    this.route = this.model.split('/')[this.model.split('/').length - 2]
    State.get(this.route)
      .then(subnav => {
        this.navigation = subnav
      }, (response) => {
        swal({title: 'Error', text: 'Can\'t fetch subnav', type: 'error'})
      })
    // this.refresh()
  },
  watch: {
    '$route' (to, from) {
      this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
      // this.refresh()
    }

  },
  mounted () {
    // this.data.edit.fields.forEach(function (field) {
    //   field.type = field.type.split('\\')[field.type.split('\\').length - 1]
    // })
    // console.log(this.$children)

  },
  methods: {
    // refresh () {
    //   var api = process.env.API_SERVER
    //   this.loading = true
    //   this.$http.get(api + this.model)
    //     .then((response) => {
    //       this.loading = false
    //       this.collection = response.data.collection
    //       this.edit = response.data.edit
    //       this.resource = this.$resource(api + this.edit.resource)

    //       // we want the last bit of model
    //       this.route = this.model.split('/')[this.model.split('/').length - 2]

          // this.edit.fields.forEach(function (field) {
          //   field.type = field.type.split('\\')[field.type.split('\\').length - 1]
          // })

          // State.get(this.route)
          //   .then(subnav => {
          //     this.navigation = subnav
          //   }, (response) => {
          //     swal({title: 'Error', text: 'Can\'t fetch subnav', type: 'error'})
          //   })
        // }, (response) => {
        //   if (!Auth.user.authenticated) {
        //     return
        //   }
        //   swal({title: 'Error', text: response.data.errors, type: 'error'})
        // })
    // },
    set (data) {
      this.$set(this.data.collection, data.pointer, data.value)
      if (this.errors != null) {
        this.clearErrors()
      }
    },
    value (fieldName) {
      return _.get(this.data.collection, fieldName)
    },
    update () {
      this.loading = true
      this.$http.put(process.env.API_SERVER + this.$route.fullPath.split('_').join('/'), this.data.collection)
        .then((response) => {
          this.loading = false
          swal({title: 'Success', text: response.data.message, type: 'success'}, () => {
            this.$emit('refresh')
            // fetch a fresh copy of the resource just updated
            // this.refresh()
          })
        }, response => {
          this.loading = false
          if (response.status === 422) {
            this.data.edit.fields.forEach((field, index) => {
              this.errors.push(response.data)
              // this.$set('errors', response.data)
              // this.errors = response.data
              if (response.data[field.name]) {
                this.$set(this.data.edit.fields[index], 'errors', response.data[field.name])
              }
            })
          } else {
            swal({title: 'Error', text: response.data.errors, type: 'error'})
          }
        })
    },
    clearErrors () {
      this.data.edit.fields.forEach((field, index) => {
        this.$set(this.data.edit.fields[index], 'errors', null)
      })
      // this.$set('errors', [])
      // this.errors = null
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
