<template lang="pug">
  CreateView(
    :inline="true"
  )
  </template>

<script>
import CreateView from './../CreateView'

export default {
  name: 'InlineAction',
  components: { CreateView }
}
</script>
