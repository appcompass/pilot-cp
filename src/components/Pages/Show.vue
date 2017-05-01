<template lang="pug">
Private
  div.row
    div.xsmall-12.columns
      div.page-header
        div.row
          div.xsmall-8.columns
            h1.page-title
              | {{ $route.params.sub || $route.params.model || $route.name }}
          div.xsmall-4.columns.text-right
            p
              //- router-link.btn-primary(v-if="can.has('create')", :to="formatLink('create')", style="margin-left: 1rem", ) Add New
      div.page-tabs(v-if="tabs && tabs.length")
        router-link.page-tab(
          v-for="(item, index) in tabs",
          :key="index",
          :to="{path: buildUrl(item.url)}",
          :class="{'is-active': activeNav(item.url)}"
        ) {{ item.title }}
      //- @TODO: we need the sub views to render in the samve view here replacing the editor.
      div.tab-section.is-active(
      )
        transition(:name="route", mode="out-in")
            router-view

</template>

<script>

import Private from 'components/Layouts/Private'
import Auth from 'States/Auth'
import NavigationState from 'States/Navigation'
import Form from 'Helpers/Form'
import RouteHandling from 'Mixins/RouteHandling'

export default {
  name: 'ShowView',
  mixins: [RouteHandling],
  components: {Private},
  data () {
    return {
      submitted: false,
      loading: true,
      route: undefined,
      tabs: [],
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
      this.tabs = []
      this.setTabs()
    },
    // formatLink (type, params) {
    //   console.log(this.$route.name, this.$route.name.replace(/\.[^/.]+$/, type ? '.' + type : ''))
    //   let obj = {
    //     name: this.$route.name.replace(/\.[^/.]+$/, type ? '.' + type : '')
    //   }
    //   if (params) {
    //     obj['params'] = params
    //   }
    //   return obj
    // },
    setTabs () {
      let url = this.reverseUrl()
      url = url.substring(0, url.lastIndexOf('/:'));
      NavigationState.get(url)
        .then(subnav => {
          this.tabs = subnav
        })
    }
  }
}
</script>

