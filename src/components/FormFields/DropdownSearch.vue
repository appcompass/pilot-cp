<template lang="pug">
v-select(
  @input="change",
  :options="field.source",
  :value.sync="data",
  :placeholder="field.config.placeholder",
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
      console.log(e)
      this.$emit('input', {pointer: this.field.name, value: e})
    }
  }
}
</script>
<style>
  .v-select {
    font-family:inherit;
  }
  .v-select .selected-tag {
    height:auto;
    margin:4px 1px 4px 3px;
  }
</style>
