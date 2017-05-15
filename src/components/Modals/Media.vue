<template lang="pug">
.add-media-modal-holder
  .add-media-header
    h2.add-media-heading Add Media
    span.add-media-header-close(@click="$emit('close')")
      span.icon-cancel
  .add-media-content
    .select
      searchable-dropdown(:field="{name: 'Disks', config: {multiple: false}}", placeholder="Please select a disk instance", :data="''", :source="disks", @input="disk")
    Dropzone(:url="$route.fullPath")
    .data-actions-container
      .data-actions
        form.data-actions-select
          .select
            select
              option(value="1") All Images
              option(value="2") Gallery 1
              option(value="4") Gallery 3
            span.icon-select

        .data-actions-view
          a.data-list-view.is-active
            span.icon-table
          a.data-grid-view
            span.icon-card
        form.data-actions-search
          .search-input
            span.icon-search
            input(type="search", placeholder="search")

    .view-container
      Sortable.media-cards(:list="gallery.photos", :element="'div'")
        media-card.media-card(v-for="photo in gallery.photos", :media="photo", :key="photo.id", @select="select", :url="photo.url")
</template>

<script>
import Sortable from 'Helpers/VueSortable'
import MediaCard from 'components/Global/MediaCard'
import SearchableDropdown from 'components/FormFields/DropdownSearch'
import Dropzone from 'components/Dropzone'

export default {
  name: 'Media',
  components: { MediaCard, Dropzone, Sortable, SearchableDropdown },
  data: () => ({
    gallery: {
      photos: [
        {id: 1, url: 'http://placehold.it/320x213'},
        {id: 2, url: 'http://placehold.it/320x213'},
        {id: 3, url: 'http://placehold.it/320x213'},
        {id: 4, url: 'http://placehold.it/320x213'}
      ]
    }
  }),
  methods: {
    select (media) {
      this.$store.dispatch('modal.done', media)
    },
    disk (data) {
      this.$store.dispatch('setDisk', data.value)
    }
  },
  mounted () {
    // @TODO where do we get gallery id
    this.axios.get('/api/galleries/1').then((response) => console.log(response))
  },
  computed: {
    disks ()  {
      return this.$store.getters.getDisks
    }
  }
}
</script>
