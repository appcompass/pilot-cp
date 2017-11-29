<template lang="pug">
  div
    div(
      v-if="!loading && Editors[form.editor]",
      :is="Editors[form.editor]",
      :data="data",
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
import api from '../../api'
import swal from 'sweetalert'
import Editors from 'components/Editors'
import Form from 'Helpers/Form'
import RouteHandling from 'Mixins/RouteHandling'

export default {
  name: 'EditView',
  mixins: [RouteHandling],
  components: {},
  data() {
    return {
      submitted: false,
      loading: true,
      model: undefined,
      route: undefined,
      tabs: undefined,
      can: this.$store.getters.abilities,
      data: {},
      form: new Form(),
      Editors
    }
  },
  created() {
    this.routeChanged()
  },
  watch: {
    $route(to, from) {
      this.routeChanged()
    }
  },
  destroyed() {
    this.$store.dispatch('CLEAR_NAV', 'side_nav')
  },
  methods: {
    routeChanged() {
      this.refresh()
    },
    set(data) {
      this.form.set(data)
    },
    update() {
      this.submitted = true
      let vm = this
      api
        .put(
          `/api${this.$route.fullPath}`,
          this.$store.getters.collection(null)
        )
        .then(response => {
          swal(
            {
              title: 'Success',
              text: response.data.message,
              type: 'success'
            },
            () => {
              this.$store.dispatch('SET_FORM', {
                form: response.data.form,
                collection: response.data.data
              })
            }
          )
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.$store.dispatch('FORM_ERRORS', error.response.data)
          } else if (error.response.status !== 403) {
            swal({
              title: 'Error',
              text: error.response.data.errors,
              type: 'error'
            })
          }
        })
    },
    refresh() {
      this.loading = true
      api
        .get(`/api${this.$route.fullPath}`, {
          params: { page: 1 }
        })
        .then(
          response => {
            // Update navigation
            this.$store.dispatch('UPDATE_NAV', response.data.navigation || {})
            this.data = response.data.data
            this.form.init(response.data.form, response.data.data)
            this.$store.dispatch('SET_FORM', {
              form: response.data.form,
              collection: response.data.data
            })
            this.loading = false
          },
          error => {
            if (!this.$store.authenticated) {
              return
            } else if (error.response.status !== 403) {
              swal({
                title: 'Error',
                text: error.response.data.errors,
                type: 'error'
              })
            }
          }
        )
        .catch(e => console.error(e))
    }
  }
}
</script>

