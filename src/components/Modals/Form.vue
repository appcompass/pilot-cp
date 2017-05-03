<template lang="pug">
.media-modal-test
  .media-modal-image
    img(src="http://placehold.it/600x400")
  .media-modal-content
    ul.media-modal-info
      li
        span Status:
        | Active
      li
        span Type:
        | N/A
      li
        span Dimensions:
        | 3264 x 2448
      li
        span Uploaded By:
        | Michael
      li
        span Uploaded On:
        | 2017-10-07
    .media-modal-actions
      a.link-icon.link-primary(@click="swap")
        span.icon-swap
        | Swap Image
      a.link-icon.link-red
        span.icon-delete
        | Delete
</template>

<script>
import FormBuilder from '../FormFields'

export default {
  name: 'Form',
  props: ['form'],
  components: { FormBuilder },
  methods: {
    swap () {
      this.$store.dispatch('modal.show', {type: 'Media', css: 'add-media-modal'}, this.after)
    },
    after (modal) {
      console.log(modal)
    }
  }
}
</script>
