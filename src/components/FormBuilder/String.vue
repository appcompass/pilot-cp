<template lang="pug">
div
  p.control
    label.label {{ label }}
    input.input(
      type="text",
      @input="$emit('input', {value: $event.target.value, pointer: pointer})",
      :value="data",
      :class="{'is-danger': errors.get(pointer)}"
    )
    p.help.is-danger
      ul
        li(v-for="error in errors.get(pointer)") {{ error }}
    p.help
      | {{ help }}
</template>

<script>
export default {
  name: 'string',
  props: ['pointer', 'data', 'label', 'errors', 'help']
}
</script>
