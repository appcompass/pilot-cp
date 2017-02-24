<template lang="jade">
span
  span(
    :is="Components[field.type]",
    :pointer="field.name",
    :data="value",
    :value="value",
    :source="field.source",
    :errors="field.errors",
    :label="field.label"
    @input="set"
  )
  FormField(v-for="sub in field.fields", :field="field", :value="value")
</template>

<script>
import * as Components from '../Components'

export default {
  name: 'SingleField',
  props: ['field', 'value'],
  data () {
    return {
      Components
    }
  },
  methods: {
    set (payload) {
      this.$emit('set', payload)
    }
  }
}
</script>
