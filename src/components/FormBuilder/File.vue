<template lang="jade">
p.control
  label.label File
  Dropzone(
    :url="$route.params.model"
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
