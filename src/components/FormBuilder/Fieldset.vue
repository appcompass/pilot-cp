<template lang="pug">
.fieldset(:class="{'draggable': true, 'is-closed': isCollapsed}")
  .fieldset-header
    .fieldset-heading(v-if="field.label", v-html="field.label")
    .input-desc(v-if="field.help", v-html="field.help")
    .fieldset-header-actions
      span.icon.icon-delete(@click="$emit('unlink')")
      span.icon.icon-box-down(@click="collapse()")
  .fieldset-fields
    FormBuilder(:form="form", @input="input")
</template>

<script>
import FormBuilder from 'components/FormBuilder'
import _ from 'lodash'

export default {
  name: 'Fieldset',
  components: {
    FormBuilder
  },
  props: ['pointer', 'errors', 'field', 'form'],
  data () {
    return {
      isCollapsed: false
    }
  },
  methods: {
    input (data) {
      this.$emit('input', {pointer: data.pointer, value: data.value})
    },
    collapse () {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>
