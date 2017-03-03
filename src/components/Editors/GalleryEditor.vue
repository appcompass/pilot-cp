<template lang="jade">
div
  .columns
    .column.is-full
      a.button.pull-right(@click="$router.go(-1)")
        span.icon.is-small
          span.fa.fa-angle-left
        .span Back
  .columns
    .column.is-half
      .content
        h1 Gallery: {{ form.collection.name || 'New Gallery' }}
        p Name: {{ form.collection.name || 'New Gallery' }}
        p(v-if="form.collection.photos.length") Photos: {{ form.collection.photos.length }}
        p(v-if="form.collection.videos.length") Photos: {{ form.collection.videos.length }}
        p Last Updated: {{ form.collection.updated_at }}
        p Owner: {{ form.collection.user.email || form.collection.user.full_name }}
    .column.is-half
      FormBuilder(:form="form", @set="set", @disk-pleez="disk")

  .columns
    .column.is-6
      a.button(@click="selectall") Select All
      a.button(@click="selectnone") Deselect All
      a.button(@click="selectinvert") Invert Selection
      a.button(@click="shouldPaginate = !shouldPaginate", v-if="pagination.last_page > 1") Toggle Pagination
      a.button.is-small.is-primary(@click="size--")
        span.icon.is-small
          i.fa.fa-search-minus
      a.button.is-small.is-primary(@click="size++")
        span.icon.is-small
          i.fa.fa-search-plus

    .column.is-6.has-text-right(v-if="selected.length > 1")
      a.button(@click="selectall")
        span.icon.is-small
          i.fa.fa-file-zip-o
        span Zip

      a.button.is-danger(@click="selectall")
        span.icon.is-small
          i.fa.fa-trash-o
        span Delete

  Pagination(:p="pagination", v-if="pagination.last_page > 1")
  Sortable.columns.is-multiline(:list="form.collection.photos", :options="{animation: 150, handle: '.handle', group: 'items'}", @change="sort", :element="'div'")
    .column(v-for="(photo, index) in form.collection.photos", :class="'is-' + size")
      .card(:class="{selected: isSelected(photo.id)}")
        .card-header.handle
          p.card-header-title(v-if="size > 2") {{ photo.path }}
          a.card-header-icon(@click="toggle(photo.id)")
            span.icon.is-small
              i.fa(:class="{'fa-dot-circle-o': isSelected(photo.id), 'fa-circle-o': !isSelected(photo.id)}")
          a.card-header-icon(@click="unlink(photo, 'photo')")
            span.icon.is-small.trash
              i.fa.fa-trash-o
        .card-image
          figure.image
            img(src="https://placehold.it/256x256")
        .card-content(v-if="size > 2")
          .content
            p.help
              ul
                li Path: {{ photo.path }}
                li Photo Id: {{ photo.id }}
                li Url:&nbsp;{{ photo.url }}
                li Created: {{ photo.created_at }}
                li Size: {{ photo.dimensions }}
                li Storage: {{ photo.storage.name }}
                li User: {{ photo.user ? photo.user.email : '' }}
                li Order: {{ photo.order }}

  Pagination(:p="pagination", v-if="pagination.last_page > 1")
</template>

<script>
import FormBuilder from '../FormBuilder'
import Sortable from '../VueSortable'
import _ from 'lodash'
import moment from 'moment-js'
import swal from 'sweetalert'
import Pagination from '../Pagination'

export default {
  name: 'GalleryEditor',
  props: ['form'],
  components: { FormBuilder, Sortable, Pagination },
  data () {
    return {
      size: 3,
      pagination: {
        current_page: 1,
        per_page: 16
      },
      shouldPaginate: true,
      selected: []
    }
  },
  created () {
    this.update()
  },
  watch: {
    'pagination.current_page' (currentPage) {
      this.update()
    },
    'shouldPaginate' () {
      this.pagination.current_page = 1
      this.update()
    }
  },
  methods: {
    update () {
      this.$http.get(process.env.API_SERVER + 'galleries/' + this.form.collection.id + '/photos', {
        params: {
          page: this.pagination.current_page,
          per_page: this.shouldPaginate ? this.pagination.per_page : 50000
        }
      })
      .then((response) => {
        this.$set(this.form.collection, 'photos', response.data.collection.data.data)
        // this.pagination.current_page = response.data.collection.current_page
        this.pagination = _.omit(response.data.collection.data, ['data', 'per_page'])
      })
    },
    next () {
      this.pagination.current_page++
      this.update()
    },
    prev () {
      this.pagination.current_page--
      this.update()
    },
    toggle (index) {
      if (this.selected.indexOf(index) > -1) {
        this.selected.splice(this.selected.indexOf(index), 1)
      } else {
        this.selected.push(index)
      }
    },
    unlink (item, type) {
      this.$http.delete(process.env.API_SERVER + 'galleries/' + this.form.collection.id + '/' + type + 's/' + item.id)
        .then((response) => {
          if (response.status === 200) {
            this.form.collection.photos.splice(this.form.collection.photos.indexOf(item), 1)
          }
        }, (response) => {
          swal('Error', 'Error while deleting photo.', 'error')
        })
    },
    selectall () {
      _.map(this.form.collection.photos, (photo) => {
        this.selected.push(photo.id)
      })
    },
    selectnone () {
      this.selected.splice(0, this.selected.length)
      moment
    },
    selectinvert () {
      this.form.collection.photos.forEach((photo) => {
        this.toggle(photo.id)
      })
    },
    isSelected (index) {
      return this.selected.indexOf(index) > -1
    },
    sort () {
      // trigger sotrting only if not in paginate mode
      if (this.shouldPaginate && this.pagination.last_page > 1) {
        return
      }

      let order = _.map(this.form.collection.photos, (photo) => { return photo.id })
      this.$http.post(process.env.API_SERVER + 'galleries/' + this.form.collection.id + '/photos/sort', {order: order})
    },
    set (data) {
      // @TODO this is ugly, we need a good way to tell if a media has been uploaded
      //  -- set another prop in the event
      if (data.pointer === 'photo') {
        this.update()
      } else {
        this.form.set(data)
      }
    },
    disk (cb) {
      cb(this.form.collection.galleryable ? this.form.collection.galleryable.storage.name : null)
    }
  }
}
</script>

<style lang="sass" scoped>
li.gallery
  white-space: nowrap
.card
  transition: all 1s
  .card-header
    transition: all 1s
.selected
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 5px rgba(10, 56, 125, 0.1)
  .card-header
    background-color: rgba(0, 57, 128, 0.2)
    &:hover
      cursor: pointer
.card-header-icon
  color: #333
  padding: 0.5rem 0.25rem
  &:hover
    color: blue
  span
    margin: 0
    padding: 0
.card-content
  overflow: hidden
.icon
  margin-right: 0.5rem
.fa-dot-circle-o
  color: blue
.trash
  &:hover
    color: red
</style>
