<template lang="pug">
div
  input(
    type="text",
    @input="$emit('input', {value: $event.target.value, pointer: pointer})",
    :value="data",
    :class="{'error': errors.get(pointer)}"
  )
</template>

<script>
export default {
  name: 'String',
  props: ['pointer', 'data', 'errors', 'field', 'index']
}
</script>
