<template lang="pug">
.add-media-modal-holder
  .add-media-header
    h2.add-media-heading Add Media
    span.add-media-header-close(@click="$emit('close')")
      span.icon-cancel
  .add-media-content
    Gallery(:route="'/api/galleries/2/photos'", @select="select", :config="{upload: true}")
</template>

<script>
import Gallery from 'components/Global/Gallery'

export default {
  name: 'Media',
  components: { Gallery },
  data: () => ({}),
  mounted () {
  },
  methods: {
    select (item) {
      this.$store.dispatch('modal.done', item)
      // console.log(item)
    }
  }
}
</script>
