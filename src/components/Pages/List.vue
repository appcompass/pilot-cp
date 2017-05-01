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

      div.view-container
        div.view-loading(v-if="loading")
          img(src="~assets/images/content/loading.svg")
        Pagination(:p="pagination", :disabled="loading", v-if="pagination.last_page > 1")
        section(
          v-if="list_layout && list_layout + 'List'",
          :is="list_layout + 'List'",
          :sorters="sorters",
          :loading="loading",
          :collection="collection",
          :owned="owned",
          :search="search",
          :forms="{form: form, edit: edit}"
        )
        div.view-no-results(
          v-if="!collection.length"
        ) No Results Found
        Pagination(:p="pagination", :disabled="loading", v-if="pagination.last_page > 1")
</template>
<script>
import _ from 'lodash'
import Pagination from 'components/Global/Pagination'
import TableList from 'components/ListTypes/TableList'
import MultiSelectList from 'components/ListTypes/MultiSelectList'
import CardList from 'components/ListTypes/CardList'
import Auth from 'States/Auth'
import NavigationState from 'States/Navigation'
import * as CreateTypes from 'components/CreateTypes'
import RouteHandling from 'Mixins/RouteHandling'

export default {
  name: 'ListView',
  mixins: [RouteHandling],
  components: {Pagination, TableList, MultiSelectList, CardList},
  data () {
    return {
      edit: [],
      form: undefined,
      list_layout: undefined,
      view_types: [],
      create_type: undefined,
      update_type: undefined,
      // @TODO: Owned is very specifict to a type of view. we need to clean up how the data is passed down to he view types.
      owned: [],
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
      let vm = this
      vm.navigation.left = null
      vm.loading = true
      vm.$http.get('/api' + vm.$route.path, {
        params: {
          page: vm.pagination.current_page,
          search: vm.search,
          sorters: vm.sorters
        }
      })
        .then((response) => {
          vm.loading = false
          if (!response.data.form) {
            vm.form = undefined
            return
          }
          vm.pagination = _.omit(response.data.collection, ['data'])
          vm.can.set(response.data.abilities)
          vm.collection = response.data.collection.data
          Object.assign(vm, _.omit(response.data, ['collection', 'abilities']))

          // default view on load is always the first.
          if (!vm.list_layout) {
            vm.list_layout = vm.view_types[0]
          }
          Object.freeze(vm.can)
        }, (response) => {
          vm.loading = false
          if (!Auth.user.authenticated) {
            return
          }
          // vm.$swal('Error!', response.data.errors, 'error')
        })
    },
    remove (id) {
      this.$swal({ title: 'Are you sure?', text: 'You will not be able to recover this', type: 'warning', showCancelButton: true, closeOnConfirm: false }, () => {
        this.$http.delete('/api/' + this.$route.path.slice(1) + '/' + id)
          .then((response) => {
            this.$swal({title: 'Success', text: response.data.message, type: 'success'}, () => {
              return this.update()
            })
          })
          .catch((response) => {
            this.$swal('Error!', response.data.message, 'error')
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
