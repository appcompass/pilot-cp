<template lang="pug">
  CreateView(
    :inline="true"
  )
  </template>

<script>
import CreateView from './../Pages/Create'

export default {
  name: 'InlineAction',
  components: { CreateView }
}
</script>
