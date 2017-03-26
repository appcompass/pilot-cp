<template lang="pug">
  div.row
    div.xsmall-12.columns
      Breadcrumbs
      div.page-header(
        v-if="!inline"
      )
        div.row
          div.xsmall-8.columns
            h1.page-title
              | {{ $route.params.sub || $route.params.model }}
      form
        FormBuilder(
          :form="form",
          @set="set"
        )
        //- Dropzone doesn't use cancel and save.  for now we're assuming
          dropzone is the only one using inline create style.
        a.btn-secondary(
          v-if="!inline",
          @click="$router.go(-1)"
        ) Cancel
        = " "
        a.btn-primary(
          v-if="!inline",
          @click="save"
        ) Save
</template>

<script>
import swal from 'sweetalert'

import * as Components from './../Components'
import FormBuilder from './../FormBuilder'
import Form from './../../Helpers/Form'
import Navigation from './../../States/Navigation'
import Breadcrumbs from './../Global/Breadcrumbs'
import RouteHandling from './../../Mixins/RouteHandling'

export default {
  name: 'CreateView',
  props: ['inline'],
  mixins: [RouteHandling],
  components: {Breadcrumbs, FormBuilder},
  data () {
    return {
      Components,
      navigation: Navigation,
      api: null,
      form: new Form()
    }
  },
  created () {
    this.model = this.$route.params.model.split('_').join('/')
    this.api = '/api' + this.$route.fullPath.split('_').join('/')
    // this.api = this.navigation.api_url

    this.$http.get(this.api)
      .then((response) => {
        this.form.init(response.data.form)

        this.create = response.data.form
      })
  },
  methods: {
    set (data) {
      this.form.set(data)
    },
    save () {
      this.$http.post(this.api, this.form.collection)
      // this.resource.save(this.form.collection)
        .then((response) => {
          swal({title: 'Success', text: response.data.message, type: 'success'
          }, () => {
            this.$router.push({name: this.$route.name + '-id-edit', params: {id: response.data.model.id}})
          })
        }, error => {
          if (error.response.status === 422) {
            this.form.fails(error.response.data)
          } else if (error.response.status !== 403) {
            swal({title: 'Error', text: error.response.data.errors, type: 'error'})
          }
        })
    }
  }
}
</script>
