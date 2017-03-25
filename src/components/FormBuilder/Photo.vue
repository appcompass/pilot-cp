<template lang="jade">
p.control
  Dropzone(
    @input="set"
  )
</template>

<script>
import Dropzone from '../Dropzone'

export default {
  name: 'Photo',
  components: { Dropzone },
  props: ['pointer', 'data', 'label', 'config'],
  data () {
    return {
      disk: null
    }
  },
  created () {
    // @TODO: make this work the right way.
    this.$parent.$on('set', (data) => {
      if (data.pointer === this.config.disk_field_name) {
        this.$emit('disk', data.value)
      }
    })
  },
  mounted () {
  },
  methods: {
    set (data) {
      data.pointer = this.pointer
      this.$emit('input', data)
    }
  }
}
</script>
