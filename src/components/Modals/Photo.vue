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
        span.icon-delete
        | Delete
</template>
<script>
export default {
  name: 'Form',
  props: ['form'],
  data: () => ({src: undefined}),
  methods: {
    swap () {
      this.$store.dispatch('modal.show', {type: 'SwapMedia', css: 'add-media-modal'})
    },
    after (modal) {
      console.log(modal)
    },
    error () {
      this.src = 'https://placehold.it/600x400'
    }
  },
  mounted () {
    this.src = this.data.url || 'https://placehold.it/600x400'
  },
  computed: {
    data () {
      return this.$store.getters.modal.data
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
