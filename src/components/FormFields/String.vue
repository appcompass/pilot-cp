<template lang="pug">
div
  span.btn.small(v-if="field.config.repeatable", @click="$emit('unlink')")
    span.icon.icon-delete
  input(
    type="text",
    @input="$emit('input', {value: $event.target.value, pointer: field.name})",
    :value="data",
    :class="{'error': errors}"
  )
</template>

<script>
export default {
  name: 'String',
  props: ['data', 'errors', 'field']
}
</script>
