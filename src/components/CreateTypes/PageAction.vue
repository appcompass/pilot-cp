<template lang="pug">
  div.row
    div.xsmall-12.columns.text-right
      p
        router-link.btn-primary(:to="{name: $parent.getRouteName('create')}") Add New
</template>
<script>
export default {
  name: 'PageAction',
  props: ['model']
}

</script>
