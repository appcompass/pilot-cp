<template lang="pug">
.row
  .xsmall-12.columns
    .page-header.no-border
      .row
        .xsmall-8.columns
          h1.page-title {{ $route.meta.title || $route.params.model }}
        .xsmall-4.columns.text-right
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
              select
                option(value="") Bulk Actions
                option(value="delete") Delete
              span.icon-select
            button.btn-secondary Update

    .view-container
      Pagination(:p="pagination", v-if="pagination.last_page > 1", @page="page")
      Sortable.media-cards(:list="form.collection", :element="'div'", :options="{animation: 150, group: 'items'}", @change="sort")
        card(v-for="card, index in form.collection", :info="form.asKeyValue(card)", :key="card.id", :url="card.url", @select="select(card)")
</template>

<script>
// @NOTES
// this component fetches a media on the current route
// it expects a specific structure
// @TODO to be extended with videos (more?) -> leverage .type attribute
import Form from '../../Helpers/Form.js'
import Sortable from '../../Helpers/VueSortable'
import Card from '../Global/Card'
import Dropzone from '../Dropzone'
import Pagination from 'components/Global/Pagination'

const form = new Form();

export default {
  name: 'MediaEditor',
  components: { Card, Sortable, Dropzone, Pagination },
  data: () => ({
    form,
    pagination: {
      page: 1,
      per_page: 25
    }
  }),
  created () {
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
      this.axios.post('/api' + this.$route.fullPath + '/sort', {order: order})
        .then((response) => {
          this.update()
        })
    },
    update () {
      this.axios.get('/api' + this.$route.fullPath, {
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
