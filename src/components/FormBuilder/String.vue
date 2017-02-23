<template lang="jade">
div.control
  label.label {{ label }}
  input.input(
    type="text",
    @input="$emit('input', {value: $event.target.value, pointer: pointer})",
    :value="data",
    :class="{'is-danger': errors}",
  )
  p.help(v-if="errors")
    ul
      li(v-for="error in errors") {{ error }}
</template>

<script>
export default {
  name: 'string',
  props: ['pointer', 'data', 'label', 'errors']
}
</script>
