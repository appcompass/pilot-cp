<template lang="pug">
p.control
  Dropzone(@input="set")
</template>

<script>
import Dropzone from '../Dropzone'

export default {
  name: 'Photo',
  components: { Dropzone },
  props: ['pointer', 'data', 'label', 'config'],
  methods: {
    set (data) {
      this.$emit('input', {pointer: this.pointer})
    }
  }
}
</script>
