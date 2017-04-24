<template lang="pug">
  div
    .select
      select(@change="set", :value="data", :class="{'is-danger': errors}")
        option(v-if="field.config.nullable", value="") None
        option(v-for="option in field.source", :value="option.index") {{ option.label }}
      span.icon-select
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'errors', 'field'],
  methods: {
    set (event) {
      this.$emit('input', {value: event.target.value, pointer: field.name})
    }
  }
}
</script>
