<template lang="jade">
p.control
  Dropzone(
    :url="$route.fullPath + '/photos/'",
    @input='set',
    @disk="disk"
  )
</template>

<script>
import Dropzone from '../Dropzone'

export default {
  name: 'Photo',
  components: { Dropzone },
  props: ['pointer', 'data', 'label'],
  methods: {
    set (data) {
      data.pointer = this.pointer
      this.$emit('input', data)
    },
    disk (cb) {
      this.$emit('disk', cb)
    }
  }
}
</script>
