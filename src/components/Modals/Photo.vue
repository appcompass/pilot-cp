<template lang="pug">
div
  .media-modal-image
    img(:src="src", @error="error")
  .media-modal-content
    ul.media-modal-info
      li(v-for="value, key in data")
        span {{ filters.capitalize(key)  }}:
        |  {{ value }}
    .media-modal-actions
      a.link-icon.link-primary(@click="swap")
        span.icon-swap
        | Swap Image
      a.link-icon.link-red
        span.icon-delete(@click="$emit('delete')")
        | Delete
</template>
<script>
export default {
  name: 'Photo',
  // props: ['src'],
  methods: {
    swap () {
      this.$store.dispatch('modal.show', {type: 'Media', css: 'add-media-modal', canClose: true})
    },
    error () {
      this.src = 'https://lorempixel.com/500/213/abstract/?77502'
    }
  },
  computed: {
    data () {
      return this.$store.getters.modal.data
    },
    src () {
      return this.$store.getters.modal.config.src
    }
  }
}
</script>

<style>
.media-modal-content ul.media-modal-info li {
  max-width: 29rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
