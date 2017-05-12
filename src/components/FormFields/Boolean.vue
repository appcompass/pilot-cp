<template lang="pug">
  div.switch
    input(type="checkbox", :id="field.name", :checked="data", @click="toggle")
    label(:for="field.name")
</template>

<script>
export default {
  name: 'boolean',
  props: ['data', 'errors', 'field'],
  mounted () {
    this.checked = this.data
  },
  methods: {
    toggle () {
      this.checked = !this.checked
      this.$emit('input', {value: this.checked, pointer: this.field.name})
    }
  }
}
</script>
