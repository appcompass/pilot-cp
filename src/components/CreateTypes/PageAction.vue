<template lang="pug">
  div.row
    div.xsmall-12.columns.text-right
      p
        router-link.btn-primary(:to="{name: getRouteName('create')}") Add New
</template>
<script>
import RouteHandling from 'Mixins/RouteHandling'

export default {
  name: 'PageAction',
  mixins: [RouteHandling]
}

</script>
