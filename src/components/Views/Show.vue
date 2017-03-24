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
              //- router-link.btn-primary(v-if="can.has('create')", :to="formatLink('create')", style="margin-left: 1rem", ) Add New
      div.page-tabs(v-if="tabs && tabs.length")
        router-link.page-tab(
          v-for="(item, index) in tabs",
          :to="item.url",
          :class="{'is-active': index == 0 && activeNav(item.url)}"
        ) {{ item.title }}
      //- @TODO: we need the sub views to render in the samve view here replacing the editor.
      div.tab-section.is-active(
      )
        transition(:name="route", mode="out-in")
            router-view

</template>

<script>
import swal from 'sweetalert'

import Auth from './../Auth'
import NavigationState from './../States/Navigation'
import FormEditor from './../Editors/FormEditor'
import MenuEditor from './../Editors/MenuEditor'
import GalleryEditor from './../Editors/GalleryEditor'
import PageEditor from './../Editors/PageEditor.vue'
import Form from './../Helpers/Form'

export default {
  name: 'ShowView',
  components: {FormEditor, MenuEditor, GalleryEditor, PageEditor},
  data () {
    return {
      submitted: false,
      loading: true,
      model: undefined,
      route: undefined,
      tabs: undefined,
      api: undefined,
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
      this.api = '/api' + this.$route.fullPath
      // this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
      // this.route = this.model.split('/')[this.model.split('/').length - 2]
      this.setTabs(this.formatLink().name)
    },
    // @TODO: same exact method in Views/List.vue. There Can Be Only One.
    formatLink (type, params) {
      let obj = {
        name: this.$route.name.replace(/\.[^/.]+$/, type ? '.' + type : '')
      }
      if (params) {
        obj['params'] = params
      }
      return obj
    },
    setTabs (route) {
      NavigationState.get(route)
        .then(subnav => {
          let pattern = /:([a-z]+)+/g
          // let test = pattern.exec('/test/:tests/another/:thing/something/:else')
          let match
          while ((match = pattern.exec('/test/:tests/another/:thing/something/:else')) != null) {
            console.log(match)
          }
          // let test = '/test/:tests/another/:thing/something/:else'.match(/:([a-z]+)+/g)
          let params = {
            tests: 10,
            thing: 20,
            else: 30
          }
          console.log(match, params)
          // for (let item of subnav) {
          //   // console.log(item.url.match(/:[a-z]*\/$/g))
          //   // item.url = item.url.replace(':id', this.$route.params.id)
          // }
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
      this.$http.put(this.api, this.form.collection)
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
      this.$http.get(this.api, {
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

