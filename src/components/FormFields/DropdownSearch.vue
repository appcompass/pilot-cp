<template lang="pug">
div
  h1 DropdownSearch
  v-select(:label="'name'", :options="source", :placeholder="field.placeholder", :value.sync="data", :multiple="field.config.multiple", @input="change")
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
