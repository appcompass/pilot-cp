<template lang="jade">
div
  p.control
    label.label {{ label }}
    textarea.textarea(@input="$emit('input', {value: $event.target.value, pointer: pointer})", :value="data", :class="{'is-danger': errors}")
    p.help.is-danger
      ul(v-if="errors")
        li(v-for="error in errors") {{ error }}
    p.help
      {{ help }}

</template>

<script>
export default {
  name: 'Text',
  props: ['pointer', 'data', 'label', 'errors', 'help']
}
</script>
