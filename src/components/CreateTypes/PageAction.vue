<template lang="pug">
  div.row
    div.xsmall-12.columns.text-right
      p
        router-link.btn-primary(:to="$parent.formatLink('create')") Add New
</template>

<script>
export default {
  name: 'PageAction',
  props: ['model']
}

</script>
