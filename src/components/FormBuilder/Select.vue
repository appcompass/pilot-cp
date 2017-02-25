<template lang="jade">
.control
  label.label {{ label }}
  span.select
    select(@change="set", :value="data", :class="{'is-danger': errors}")
      option(v-for="option in source", :value="option.id") {{ option.label }}
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'label', 'pointer', 'source', 'errors'],
  methods: {
    set (event) {
      this.$emit('input', {value: event.target.value, pointer: this.pointer})
    }
  }
}
</script>

<style lang="sass" scoped>
select.is-danger
  border-color: red !important
</style>
