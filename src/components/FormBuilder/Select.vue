<template lang="pug">
div
  p.control
    label.label {{ label }}
    span.select
      select(@change="set", :value="data", :class="{'is-danger': errors.get(pointer)}")
        option(v-if="config.nullable", value="") None
        option(v-for="option in source", :value="option.index") {{ option.label }}

    p.help.is-danger
      ul
        li(v-for="error in errors.get(pointer)") {{ error }}
    p.help
      | {{ help }}
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'label', 'pointer', 'source', 'errors', 'help', 'config'],
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
