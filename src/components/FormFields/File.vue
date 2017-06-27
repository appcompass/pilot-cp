<template lang="pug">
div(v-if="data")
  img(:src="src", @error.prevent="placeholder", width="500", hwight="213", @click="card")
  p
    strong Path:
    |  {{ data }}
div(v-else)
  a.btn(type="button", @click.prevent="selectMedia") Select
</template>

<script>

export default {
  name: 'File',
  props: ['pointer', 'data', 'label', 'field'],
  methods: {
    selectMedia () {
      this.$store.dispatch('modal.show', {type: 'Media', css: 'add-media-modal', canClose: true, cb: this.set})
    },
    card () {
      this.$store.dispatch('modal.show', {type: 'Photo', css: 'media-modal', canClose: true, cb: this.set, src: this.src})
    },
    set (selection) {
      // console.log(selection)
      // @TODO card_photo
      this.$emit('input', {pointer: this.field.name, value: selection.card_photo})
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
