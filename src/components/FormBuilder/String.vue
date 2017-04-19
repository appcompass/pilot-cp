<template lang="pug">
div
  span.btn.small(v-if="field.config.repeatable", @click="$emit('unlink')")
    span.icon.icon-delete
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
  props: ['pointer', 'data', 'errors', 'field']
}
</script>
