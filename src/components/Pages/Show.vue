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
          :class="{'is-active': activeNav(item.url)}"
        ) {{ item.title }}
      //- @TODO: we need the sub views to render in the samve view here replacing the editor.
      div.tab-section.is-active(
      )
        transition(:name="route", mode="out-in")
            router-view

</template>

<script>
import swal from 'sweetalert'

import Auth from './../../States/Auth'
import NavigationState from './../../States/Navigation'
import FormEditor from './../Editors/FormEditor'
import MenuEditor from './../Editors/MenuEditor'
import GalleryEditor from './../Editors/GalleryEditor'
import PageEditor from './../Editors/PageEditor'
import Form from './../../Helpers/Form'
import RouteHandling from './../../Mixins/RouteHandling'

export default {
  name: 'ShowView',
  mixins: [RouteHandling],
  components: {FormEditor, MenuEditor, GalleryEditor, PageEditor},
  data () {
    return {
      submitted: false,
      loading: true,
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
      this.tabs = undefined
      this.setTabs(this.formatLink().name)
    },
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
      NavigationState.get(route.split('.')[0])
        .then(subnav => {
          for (let item of subnav) {
            item.url = this.buildLink(item.url)
            // @TODO: the tabs here are a bit wonky.  the state doesn't get changed consistently on resource swap.
            console.log(item.url)
          }
          this.tabs = subnav
        })
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

