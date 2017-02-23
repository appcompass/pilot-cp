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
        //- form
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
        //- footer
          p.control
            .pull-right
              a.button.is-primary(
                :class="{'is-loading': loading}",
                :disable="loading",
                @click="update"
              ) Save

    .column.is-3.is-offset-1(v-if="navigation && navigation.length")
      h1.menu-label Sub Navigation
      aside.menu
        ul.menu-list
          li(v-for="item in navigation")
            router-link(:to="{name: 'sub', params: {model: model.split('/')[model.split('/').length - 2], id: $route.params.id, sub: item.url.split('/')[item.url.split('/').length - 1]}}") {{ item.title }}

  //- div.columns
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
      loading: false,
      model: undefined,
      route: undefined,
      navigation: undefined
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
  },
  watch: {
    '$route' (to, from) {
      this.model = this.$route.params.model.split('_').join('/') + '/' + this.$route.params.id
    }

  },
  methods: {
    set (data) {
      this.$set(this.data.collection, data.pointer, data.value)
      if (this.errors != null) {
        this.clearErrors()
      }
    },
    value (fieldName) {
      return _.get(this.data.collection, fieldName)
    },
    clearErrors () {
      this.data.edit.fields.forEach((field, index) => {
        this.$set(this.data.edit.fields[index], 'errors', null)
      })
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
