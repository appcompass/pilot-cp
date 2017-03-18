<template lang="pug">
  div.row
    div.xsmall-12.columns

      div.page-header
        div.row
          div.xsmall-8.columns
            h1.page-title
              | {{ $route.params.sub || $route.params.model }}
          div.xsmall-4.columns.text-right
            p
              router-link.btn-primary(v-if="can.has('create')", :to="{name: 'create', params: {model: model}}", style="margin-left: 1rem", ) Add New
      div(
        :is="form.form.editor + 'Editor'",
        :form="form",
        @refresh="refresh",
        @set="set"
      )
      button.btn-primary(
        :class="{'is-loading': loading}",
        :disable="submitted",
        @click.prevent="update"
      ) Save

      //- @TODO: This needs to be moved to a master view since we now have the side nav for sub nav.
      transition(:name="route", mode="out-in")
          router-view(name="sub")

</template>

<script>
import swal from 'sweetalert'

import Auth from './Auth'
import NavigationState from './States/Navigation'
import FormEditor from './Editors/FormEditor'
import MenuEditor from './Editors/MenuEditor'
import GalleryEditor from './Editors/GalleryEditor'
import PageEditor from './Editors/PageEditor.vue'
import Form from './Helpers/Form'

export default {
  name: 'EditView',
  components: { FormEditor, MenuEditor, GalleryEditor, PageEditor },
  data () {
    return {
      submitted: false,
      loading: true,
      model: undefined,
      route: undefined,
      navigation: undefined,
      can: Auth.abilities,
      form: new Form()
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
      NavigationState.setLeftNav(route, this.model)
    },
    set (data) {
      this.form.set(data)
    },
    update () {
      this.submitted = true
      this.$http.put('/api/' + this.$route.fullPath.split('_').join('/'), this.form.collection)
        .then((response) => {
          swal({title: 'Success', text: response.data.message, type: 'success'}, () => {
            this.refresh()
          })
        }, error => {
          if (error.response.status === 422) {
            this.form.fails(error.response.data)
          } else if (error.response.status !== 403) {
            swal({title: 'Error', text: error.response.data.errors, type: 'error'})
          }
        })
    },
    refresh () {
      this.loading = true
      this.$http.get('/api/' + this.model, {
        params: {
          page: 1
        }
      })
        .then((response) => {
          this.form.init(response.data.edit, response.data.collection)
          this.loading = false
        }, (error) => {
          if (!Auth.user.authenticated) {
            return
          } else if (error.response.status !== 403) {
            swal({title: 'Error', text: error.response.data.errors, type: 'error'})
          }
        })
    }
  }
}
</script>

