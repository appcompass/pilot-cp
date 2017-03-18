<template lang="jade">
  div.columns
    .column(v-if="!list && !loading")
      .hero.is-bold.is-danger
        .container
          .hero-body
            .container
              h1.title Missing List View Form
              h2.subtitle  List Form are build using the
                strong  ResourceBuilder,
                |  please provide one.

    .column.is-11(v-if="list")
      h1.title.is-4 List: {{ $route.params.sub || $route.params.model }}

        p.control.pull-right
          a.button.is-small.is-secondary(@click="list.list_layout = 'Card'")
            span.icon.is-small
              i.fa.fa-table
          a.button.is-small.is-secondary(@click="list.list_layout = 'Table'")
            span.icon.is-small
              i.fa.fa-list
          router-link.button.is-small.is-primary(v-if="can.has('create')", :to="{name: 'create', params: {model: model}}", style="margin-left: 1rem", )
            span.icon.is-small
              i.fa.fa-plus
            span Create


      Pagination(:p="pagination", :disabled="loading", v-if="pagination.last_page > 1")

      main.main

        div.overlay.is-full-width(v-if="loading")
            section.content.has-text-centered
              p.notification.is-info.title.is-5 crafting the resource you requested...

        section(
          :is="collection.view + 'List'",
          :sorters="sorters",
          :loading="loading",
          :collection="collection",
          :model="model",
          :search="search",
          :forms="{list: list, edit: edit}"
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

export default {
  name: 'ListView',
  components: { Pagination, TableList, MultiSelectList, CardList },
  data () {
    return {
      edit: [],
      list: undefined,
      model: '',
      collection: {},
      search: {},
      sorters: {},
      loading: true,
      pagination: {current_page: 1, surrounded: 3},
      can: Auth.abilities
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
      this.loading = true
      this.sorters = {}
      this.search = {}
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
    update () {
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
          if (!response.data.list) {
            this.list = undefined
            return
          }
          this.list = response.data.list
          this.pagination = _.omit(response.data.collection.data, ['data'])
          this.collection = response.data.collection
          this.can.set(response.data.abilities)
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

<style lang="sass">
.is-opaque
  opacity: 0.4

input[disabled]
  background: transparent
  border: 0
  font-weight: bold
  &::before
    content: '&gt'
    position: abosolute
    top: 0
    right: 0
    z-index: 10000
.main
  position: relative

.filter-toggle
  opacity: 0.2
  &:hover
    color: blue
    cursor: pointer

.is-sortable
  position: relative
  border-bottom: 1px solid #ddd

  &.is-active
    border: 0
    &::after
      color: blue

  &.asc
    &::after
      content: " #{'\f077'}"
      font-family: 'FontAwesome'
      margin-left: 1rem
  &.desc
    &::after
      content: " #{'\f078'}"
      font-size: 0.8rem
      font-family: 'FontAwesome'
      margin-left: 1rem

.overlay
  position: absolute
  width: 100%
  z-index: 1000
  opacity: 0.8
</style>
