<template lang="pug">
.add-media-modal-holder
  .add-media-header
    h2.add-media-heading Add Media
    span.add-media-header-close(@click="$emit('close')")
      span.icon-cancel
  .add-media-content
    .select
      select(@input="$store.dispatch('setDisk', $event.target.value)")
        option(v-for="disk in disks", :value="disk.id", :key="disk.id") {{ disk.name }}
      span.icon.select
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
      .media-cards
        media-card(v-for="photo in gallery.photos", :media="photo", :key="photo.id", @select="select")
</template>

<script>
import MediaCard from '../Global/MediaCard'
import Dropzone from '../Dropzone'

export default {
  name: 'MediaModal',
  components: { MediaCard, Dropzone },
  data: () => ({
    gallery: {
      photos: [
        {id: 1, path: 'http://placehold.it/320x213'},
        {id: 2, path: 'http://placehold.it/320x213'},
        {id: 3, path: 'http://placehold.it/320x213'},
        {id: 4, path: 'http://placehold.it/320x213'}
      ]
    }
  }),
  methods: {
    select (media) {
      this.$store.dispatch('modal.done', media)
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
