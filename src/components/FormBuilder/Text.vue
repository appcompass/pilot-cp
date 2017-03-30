<template lang="pug">
  div
    textarea.textarea(
      @input="$emit('input', {value: $event.target.value, pointer: pointer})",
      :class="{'error': errors.get(pointer)}",
      :value="data"
    )
</template>

<script>
export default {
  name: 'Text',
  props: ['pointer', 'data', 'errors', 'field']
}
</script>
