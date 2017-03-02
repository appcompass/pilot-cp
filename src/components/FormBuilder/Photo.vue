<template lang="jade">
p.control
  Dropzone(
    :url="$route.fullPath + '/photos/'",
    @set='set',
    @disk-pleez="disk"
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
      this.$emit('input', data)
    },
    disk (cb) {
      this.$emit('disk-pleez', cb)
    }
  }
}
</script>
