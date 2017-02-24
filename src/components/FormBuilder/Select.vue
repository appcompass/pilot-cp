<template lang="jade">
.control
  label.label {{ label }}
  select(@change="set", v-model="data.data")
    option(v-for="option in data.source", :value="option.id") {{ option.label }}
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'label', 'pointer', 'source'],
  methods: {
    set (event) {
      this.$emit('input', {value: event.target.value, pointer: this.pointer})
    }
  }
}
</script>
