<template lang="pug">
v-select(
  @input="change",
  :label="'name'",
  :options="source",
  :value.sync="data",
  :placeholder="field.placeholder",
  :multiple="field.config.multiple")
</template>

<script>
import vSelect from "vue-select"

// @CONVENTION takes an array of objects in the form
// [{id: <int/string>, name: <string>}, {}]

export default {
  name: 'DropdownSearch',
  components: { vSelect },
  props: ['field', 'data', 'errors', 'source', 'label'],
  methods: {
    change (e) {
      this.$emit('input', {pointer: this.field.name, value: e.id})
    }
  }
}
</script>
