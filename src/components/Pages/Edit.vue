<template lang="pug">
div
    div(
      v-if="!loading && Editors[form.form.editor]",
      :is="Editors[form.form.editor]",
      :form="form",
      @refresh="refresh",
      @set="set"
    )
    button.btn-primary(
      :class="{'is-loading': loading}",
      :disable="submitted",
      @click.prevent="update"
    ) Save

</template>

<script>
import swal from 'sweetalert'

import Auth from './../../States/Auth'
import * as Editors from './../Editors'
import Form from './../../Helpers/Form'
import RouteHandling from './../../Mixins/RouteHandling'

export default {
  name: 'EditView',
  mixins: [RouteHandling],
  components: {
  },
  data () {
    return {
      submitted: false,
      loading: true,
      model: undefined,
      route: undefined,
      tabs: undefined,
      api: undefined,
      can: Auth.abilities,
      form: new Form(),
      Editors
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
      // this.setTabs(this.route)
      // // this.api = this.navigation.api_url
      // this.api = '/api' + this.$route.fullPath.split('_').join('/')
      this.refresh()
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

