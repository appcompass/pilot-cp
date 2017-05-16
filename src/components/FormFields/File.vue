<template lang="pug">
div(v-if="data")
  img(:src="src", @error.prevent="placeholder", width="500", hwight="213", @click="card")
  p
    strong Path:
    |  {{ data }}
  //- a.btn(type="button", @click.prevent="media") Swap
div(v-else)
  a.btn(type="button", @click.prevent="media") Select
</template>

<script>
import Dropzone from '../Dropzone'

export default {
  name: 'File',
  components: { Dropzone },
  props: ['pointer', 'data', 'label', 'field'],
  methods: {
    media () {
      this.$store.dispatch('modal.show', {type: 'Media', css: 'add-media-modal', cb: this.set})
    },
    card () {
      this.$store.dispatch('modal.show', {type: 'Form', css: 'media-modal', cb: this.set})
    },
    set (selection) {
      this.$emit('input', {pointer: this.field.name, value: selection.path})
    },
    placeholder (e) {
      e.onerror = ''
      e.target.src = 'https://lorempixel.com/500/213/abstract/?77502'
      return true
    }
  },
  computed: {
    modal () {
      return this.$store.modal
    },
    src () {
      return this.data || 'https://lorempixel.com/500/213/abstract/?77502'
    }
  }
}
</script>
