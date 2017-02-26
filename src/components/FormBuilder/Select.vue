<template lang="jade">
div
  p.control
    label.label {{ label }}
    span.select
      select(@change="set", :value="data", :class="{'is-danger': errors}")
        option(v-for="option in source", :value="option.id") {{ option.label }}

    p.help.is-danger
      ul(v-if="errors")
        li(v-for="error in errors") {{ error }}
    p.help
      | {{ help }}
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'label', 'pointer', 'source', 'errors', 'help'],
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
