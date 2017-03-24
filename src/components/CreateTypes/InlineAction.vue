<template lang="pug">
  CreateView(
    :inline="true"
  )
  </template>

<script>
import CreateView from './../Views/Create'

export default {
  name: 'InlineAction',
  components: { CreateView }
}
</script>
