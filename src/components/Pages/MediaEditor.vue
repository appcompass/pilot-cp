<template lang="pug">
.row
  .xsmall-12.columns
    .page-header.no-border
      .row
        Gallery(:route="'/api/' + $route.fullPath", @select="select", :config="{upload: true}")
</template>

<script>
import Gallery from 'components/Global/Gallery'

export default {
  name: 'MediaEditor',
  components: { Gallery },
  methods: {
    select (item) {

    }
  }
}
</script>
