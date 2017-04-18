<template lang="pug">
  input(
    type="text",
    @input="$emit('input', {value: $event.target.value, pointer: pointer, index: index})",
    :value="data",
    :class="{'error': errors.get(pointer)}"
  )
</template>

<script>
export default {
  name: 'String',
  props: ['pointer', 'data', 'errors', 'field', 'index'],
  mounted () {
    // console.log(this.data)
  }
}
</script>
