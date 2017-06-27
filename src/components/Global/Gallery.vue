<template lang="pug">
.row
  .xsmall-12.columns
    .page-header.no-border
      .row(v-if="config.upload")
        //- .xsmall-8.columns
          h1.page-title {{ $route.meta.title || $route.params.model }}
        //- .xsmall-4.columns.text-right
        .xsmall-12.columns.text-right
          .select
            select(@change="setDisk", v-model="selectedDisk")
              option(:value="undefined") Please select a disk instance
              option(v-for="disk in disks", :value="disk.name") {{ disk.name }}
            span.icon-select
          Dropzone(:url="$route.fullPath", v-if="selectedDisk", @input="input")
          div.upload-drop(v-else) Please select disk instance before dropping files here!

      .data-actions-container
        .data-actions
          form.data-actions-bulk
            div.select
              select(v-model="bulkAction")
                option(value="undefined") Bulk Actions
                option(value="delete") Delete
                option(value="dunno") Dunno
              span.icon-select
            button.btn-secondary(:disabled="true", @click="bulk") Update
          .data-actions
            button.btn-secondary.is-small(@click="all") All
            button.btn-secondary(@click="invert") Invert
            button.btn-secondary(@click="none") None
            button.btn-primary {{ selected.length }}

    .view-container
      Pagination(:p="pagination", v-if="pagination.last_page > 1", @page="page")
      Sortable.media-cards(:list="form.collection", :element="'div'", :options="{animation: 150, group: 'items'}", @change="sort")
        card(
          v-for="card, index in form.collection",
          :key="card.id",
          :info="form.asKeyValue(card)",
          :url="card.url",
          :checked="isSelected(card.id)",
          @select="$emit('select', card)",
          @toggle="toggle(card.id)",
          @unlink="$emit('unlink', card.id)"
        )
</template>

<script>
import Form from '../../Helpers/Form.js'
import Sortable from '../../Helpers/VueSortable'
import Card from '../Global/Card'
import Dropzone from '../Dropzone'
import Pagination from './Pagination'
import swal from 'sweetalert'
import api from '../../api'

const form = new Form();

export default {
  name: 'Gallery',
  components: { Card, Sortable, Dropzone, Pagination },
  props: {
    route: String,
    config: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    form,
    selected: [],
    pagination: {
      page: 1,
      per_page: 25
    },
    bulkAction: undefined
  }),
  created () {
    this.$store.dispatch('FETCH_DISK_INSTANCES')
    this.update()
  },
  methods: {
    // incoming from Card children
    select (card) {
      this.$store.dispatch('modal.show', {type: 'Photo', css: 'media-modal', data: this.form.asKeyValue(card), cb: this.set})
    },
    setDisk (data) {
      this.$store.dispatch('setDisk', data.target.value)
    },
    input (data) {
      this.update()
      // form.collection.push(data.value)
    },
    page (page) {
      this.pagination.page = page
      this.update()
    },
    sort () {
      let order = _.map(this.form.collection, (photo) => { return photo.id })
      api.post('/api' + this.$route.fullPath + '/sort', {order: order})
        .then((response) => {
          this.update()
        })
    },
    toggle (index) {
      if (this.selected.indexOf(index) > -1) {
        this.selected.splice(this.selected.indexOf(index), 1)
      } else {
        this.selected.push(index)
      }
    },
    isSelected (index) {
      return this.selected.indexOf(index) > -1
    },
    all () {
      this.selected = []
      this.form.collection.forEach((item) => {
        this.selected.push(item.id)
      })
    },
    invert () {
      this.form.collection.forEach((item) => {
        this.toggle(item.id)
      })
    },
    none () {
      this.selected = []
    },
    unlink (id) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(() => {
        api.destroy(`/api${this.$route.fullPath}/${id}`)
          .then((response) => {
            this.update()
          }, (response) => {
            if (response.status !== 403) {
              this.$swal('Error', 'Error while deleting photo.', 'error')
            }
          })
      })
    },
    bulk () {
      console.log(this.bulkAction)
    },
    update () {
      api.get(this.route, {
        params: {
          page: this.pagination.page,
          per_page: this.pagination.per_page
        }
      })
        .then((response) => {
          this.pagination = _.omit(response.data.collection, ['data'])
          form.init(response.data.form, response.data.collection.data)
          if (response.data.api_url) {
            form.setEndpoint(response.data.api_url)
          }
          return Promise.resolve()
        })
    }
  },
  computed: {
    disks () {
      return this.$store.getters.getDisks
    },
    selectedDisk () {
      return this.$store.getters.selected
    }
  }
}
</script>
