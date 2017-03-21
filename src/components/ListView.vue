<template lang="pug">
  div.row
    div.xsmall-12.columns(v-if="!form && !loading")
      .hero.is-bold.is-danger
        .container
          .hero-body
            .container
              h1.title Missing List View Form
              h2.subtitle  List Form are build using the
                strong  ResourceBuilder,
                |  please provide one.
    div.xsmall-12.columns(v-else)
      div.page-header
        div.row
          div.xsmall-8.columns
            h1.page-title
              | {{ $route.params.sub || $route.params.model }}
          div.xsmall-4.columns.text-right
        div(
          v-if="can.has('create') && CreateTypes[create_type]",
          :is="CreateTypes[create_type]",
          :model="model"
        )

      div.data-actions-container
        div.data-actions
          form.data-actions-bulk
            div.select
              select
                option(value="") Bulk Actions
                option(value="delete") Delete
                option(value="edit") Edit
              span.icon-select
            button.btn-secondary(type="submit") Update
          div.data-actions-filters-toggle
            a.data-actions-filters-trigger(v-on:click="filter_results_toggle = !filter_results_toggle")
              span.icon-filters
              span.data-actions-filters-label Filter Results
          div.data-actions-view(
            v-if="view_types.length > 1"
          )
            a.data-list-view(
              v-for="view_type in view_types",
              @click="list_layout = view_type",
              :class="{'is-active': view_type == list_layout}"
            )
              span.icon(
                :class="'icon-' + view_type.toLowerCase()"
              )
          form.data-actions-search
            div.search-input
              span.icon-search
              input(type="search", placeholder="Search")
        div.data-actions-filters(:class="{'is-active': filter_results_toggle === true}")
          form
            div.row
              div.xsmall-6.columns
                label(for="") Label
                input(type="text")
              div.xsmall-6.columns
                label(for="") Label
                input(type="text")
            div.row
              div.xsmall-12 columns
                button.btn-primary Apply Filters
                a.data-actions-filters-clear Remove Filters

      Pagination(:p="pagination", :disabled="loading", v-if="pagination.last_page > 1")
      div.overlay.is-full-width(v-if="loading")
          section.content.has-text-centered
            p.notification.is-info.title.is-5 Loading...
      section(
        :is="list_layout + 'List'",
        :sorters="sorters",
        :loading="loading",
        :collection="collection",
        :model="model",
        :search="search",
        :forms="{form: form, edit: edit}"
      )
      Pagination(:p="pagination", :disabled="loading", v-if="pagination.last_page > 1")
</template>
<script>
import swal from 'sweetalert'
import _ from 'lodash'
import Pagination from './Pagination'
import TableList from './LayoutTypes/TableList'
import MultiSelectList from './LayoutTypes/MultiSelectList'
import CardList from './LayoutTypes/CardList'
import Auth from './Auth.js'
import NavigationState from './States/Navigation'
import * as CreateTypes from './CreateTypes'

export default {
  name: 'ListView',
  components: { Pagination, TableList, MultiSelectList, CardList },
  data () {
    return {
      edit: [],
      form: undefined,
      list_layout: undefined,
      view_types: [],
      create_type: undefined,
      update_type: undefined,
      model: '',
      collection: {},
      search: {},
      sorters: {},
      loading: true,
      filter_results_toggle: false,
      pagination: {current_page: 1, surrounded: 3},
      can: Auth.abilities,
      navigation: NavigationState,
      CreateTypes
    }
  },
  watch: {
    'pagination.current_page' (nv, ov) {
      // prevent double firing on creation
      if (ov == null) {
        return
      }
      this.update()
    },
    '$route' (to, from) {
      this.search = {}
      if (to.path === from.path) {
        return
      }
      this.model = to.path.slice(1).split('/').join('_')
      this.reset()
      // we trigger an update only if page stays the same, otherwise we let pagination watcher fire the query
      if (this.pagination.current_page === 1) {
        this.update()
      } else {
        this.pagination.current_page = 1
      }
    }
  },
  created () {
    this.update()
  },
  methods: {
    applyFilter: _.debounce(function () {
      if (this.pagination.current_page > 1) {
        this.pagination.current_page = 1
      } else {
        this.update()
      }
    }, 500),
    reset () {
      this.loading = true
      this.sorters = {}
      this.search = {}
      this.list_layout = null
      this.create_type = null
      this.update_type = null
    },
    update () {
      this.navigation.left_nav = null
      this.loading = true
      this.model = this.$route.path.slice(1).split('/').join('_')
      this.$http.get('/api/' + this.$route.path.slice(1), {
        params: {
          page: this.pagination.current_page,
          search: this.search,
          sorters: this.sorters
        }
      })
        .then((response) => {
          this.loading = false
          if (!response.data.form) {
            this.form = undefined
            return
          }
          this.form = response.data.form
          this.pagination = _.omit(response.data.collection, ['data'])
          this.collection = response.data.collection.data
          this.can.set(response.data.abilities)
          this.view_types = response.data.view_types
          this.create_type = response.data.create_type
          this.update_type = response.data.update_type
          // default view on load is always the first.
          if (!this.list_layout) {
            this.list_layout = this.view_types[0]
          }
          Object.freeze(this.can)
        }, (response) => {
          this.loading = false
          if (!Auth.user.authenticated) {
            return
          }
          // swal('Error!', response.data.errors, 'error')
        })
    },
    remove (id) {
      swal({ title: 'Are you sure?', text: 'You will not be able to recover this', type: 'warning', showCancelButton: true, closeOnConfirm: false }, () => {
        this.$http.delete('/api/' + this.$route.path.slice(1) + '/' + id)
          .then((response) => {
            swal({title: 'Success', text: response.data.message, type: 'success'}, () => {
              return this.update()
            })
          })
          .catch((response) => {
            swal('Error!', response.data.message, 'error')
          })
      })
    },
    toggleEdit (field) {
      if (this.edit.indexOf(field.id) > -1) {
        delete this.search[field.name]
        this.edit.splice(this.edit.indexOf(field.id), 1)
        if (this.pagination.current_page > 1) {
          this.pagination.current_page = 1
        } else {
          this.update()
        }
      } else {
        this.edit.push(field.id)
      }
    },
    toggleSorter (field) {
      if (!field.config.sortable) {
        return
      }
      let sorter = this.sorters[field.name]
      switch (sorter) {
        case 'ASC':
          this.$set(this.sorters, field.name, 'DESC')
          break
        case 'DESC':
          this.$delete(this.sorters, field.name)
          break
        default:
          this.$set(this.sorters, field.name, 'ASC')
      }
      this.update()
    }
  }
}
</script>
