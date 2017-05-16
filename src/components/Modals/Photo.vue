<template lang="pug">
div
  .media-modal-image
    img(:src="data.url || 'https://placehold.it/400x400'")
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
  data: () => ({}),
  methods: {
    swap () {
      this.$store.dispatch('modal.show', {type: 'Media', css: 'add-media-modal'}, this.after)
    },
    after (modal) {
      console.log(modal)
    }
  },
  computed: {
    data () {
      return this.$store.getters.modal.data
    }
  }
}
</script>
