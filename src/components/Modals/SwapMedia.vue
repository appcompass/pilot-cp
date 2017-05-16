<template lang="pug">
.add-media-modal-holder
  .add-media-header
    h2.add-media-heading Swap Photo
    span.add-media-header-close(@click="$emit('close')")
      span.icon-cancel
  .add-media-content
    .select
      searchable-dropdown(:field="{name: 'Disks', config: {multiple: false}}", placeholder="Please select a disk instance", :data="''", :source="disks", @input="disk")
    Dropzone(:url="$route.fullPath", @input="uploaded")
</template>

<script>
import MediaCard from 'components/Global/MediaCard'
import SearchableDropdown from 'components/FormFields/DropdownSearch'
import Dropzone from 'components/Dropzone'

export default {
  name: 'SwapMedia',
  components: { Dropzone, SearchableDropdown },
  data: () => ({
    gallery: {
      photos: []
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
  mounted () {},
  computed: {
    disks ()  {
      return this.$store.getters.getDisks
    },
    uploaded (event) {
      console.log(event)
    }
  }
}
</script>
