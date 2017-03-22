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
      div.page-tabs(v-if="tabs && tabs.length")
        router-link.page-tab(
          v-for="(item, index) in tabs",
          :to="{name: 'sub', params: {model: model.split('/')[model.split('/').length - 2], id: $route.params.id, sub: item.url.split('/')[item.url.split('/').length - 1]}}",
          :class="{'is-active': index == 0 && activeNav(item.url)}"
        ) {{ item.title }}

      //- @TODO: we need the sub views to render in the samve view here replacing the editor.
      div.tab-section.is-active(
      )
        div(
          v-if="!loading",
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
      tabs: undefined,
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
      this.setTabs(this.route)
      this.refresh()
    },
    setTabs (route) {
      NavigationState.get(route)
        .then(subnav => {
          this.tabs = subnav
        })
    },
    // @TODO: need to check the current nav item URL with the current route url to see where we are and highlight the correct one.
    // this should prob get put into the NavigationState so it is checked and used for all navs.
    activeNav (url) {
      return true
    },
    set (data) {
      this.form.set(data)
    },
    update () {
      this.submitted = true
      // let url = '/api' + NavigationState.current_url
      let url = '/api' + this.$route.fullPath.split('_').join('/')
      // As of right now we can reach a single record edit from via /resource/id and /resource/id/edit
      // this is to stip out the edit if it's present so we can use the current/same  url to update.
      // @TODO: unify all edit views to use the /edit syntax, it's the appropriate resourceful aproach
      // since create is /create and the rest are request methods on the parent resource.
      if (url.lastIndexOf('/edit') > 1) {
        url = url.substring(0, url.lastIndexOf('/edit'))
      }
      this.$http.put(url, this.form.collection)
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
          this.form.init(response.data.form, response.data.collection)
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

