<template lang="jade">
.control
  h1.title.is-4 {{ label }}
</template>

<script>
export default {
  name: 'Fieldset',
  props: [ 'label' ]
}
</script>

<style lang="sass" scoped>
.control
  margin-top: 1rem
</style>
