<template lang="pug">
.row
  .xsmall-12.columns
    .page-header.no-border
      .row
        .xsmall-8.columns
          h1.page-title {{ $route.meta.title || $route.params.model }}
        .xsmall-4.columns.text-right
          .select
            select(@change="disk")
              option(v-for="disk in disks", :value="disk.name") {{ disk.name }}
            span.icon-select
          Dropzone(:url="$route.fullPath")

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
  // props: [ 'forms', 'collection' ],
  mounted () {
    this.axios.get('/api' + this.$route.fullPath)
      .then((response) => form.init(response.data.form, response.data.collection.data))
  },
  methods: {
    select (card) {
      console.log(card)
    },
    disk (data) {
      this.$store.dispatch('setDisk', data.target.value)
    }
  },
  computed: {
    disks ()  {
      return this.$store.getters.getDisks
    }
  }
}
</script>
