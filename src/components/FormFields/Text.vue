<template lang="pug">
  div
    textarea.textarea(
      @input="$emit('input', {value: $event.target.value, pointer: field.name})",
      :class="{'error': errors}",
      :value="data"
    )
</template>

<script>
export default {
  name: 'Text',
  props: ['data', 'errors', 'field']
}
</script>
