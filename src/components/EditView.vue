<template lang="jade">
div
  .columns
    .column.is-10(v-if="form.form.editor")
      div(
        :is="form.form.editor + 'Editor'",
        :form="form",
        @refresh="refresh",
        @set="set"
      )
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
import swal from 'sweetalert'

import Auth from './Auth'
import State from './State'
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
      State.get(route)
        .then(subnav => {
          this.navigation = subnav
        })
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
