<template lang="jade">
div
  p.control
    label.label {{ label }}
    textarea.textarea(
      @input="$emit('input', {value: $event.target.value, pointer: pointer})",
      :class="{'is-danger': errors.get([pointer])}",
      :value="data"
    )
    p.help.is-danger
      ul
        li(v-for="error in errors.get(pointer)") {{ error }}
    p.help
      | {{ help }}

</template>

<script>
export default {
  name: 'Text',
  props: ['pointer', 'data', 'label', 'errors', 'help']
}
</script>
