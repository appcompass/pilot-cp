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
      Sortable.media-cards(:list="form.collection", :element="'div'", :options="{animation: 50, group: {name: 'items', pull: 'clone', put: false}}")
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
import SearchableDropdown from '../FormFields/DropdownSearch'

const form = new Form();

export default {
  name: 'MediaEditor',
  components: { Card, Sortable, SearchableDropdown, Dropzone },
  data: () => ({ form }),
  mounted () {
    this.axios.get('/api' + this.$route.fullPath)
      .then((response) => {
        form.init(response.data.form, response.data.collection.data)
        if (response.data.api_url) {
          form.setEndpoint(response.data.api_url)
        }
      })
  },
  methods: {
    // incoming from Card children
    select (card) {
      this.$store.dispatch('modal.show', {type: 'Photo', css: 'media-modal', data: this.form.asKeyValue(card), cb: this.set})
    },
    setDisk (data) {
      this.$store.dispatch('setDisk', data.target.value)
    },
    set () {
      console.log('modal closed')
    },
    input (data) {
      form.collection.push(data.value)
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
