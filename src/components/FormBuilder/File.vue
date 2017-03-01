<template lang="jade">
p.control
  Dropzone(
    :url="$route.fullPath"
  )
</template>

<script>
import Dropzone from '../Dropzone'

export default {
  name: 'File',
  components: { Dropzone },
  props: ['pointer', 'data', 'label']
}
</script>
