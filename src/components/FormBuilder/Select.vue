<template lang="jade">
.control
  label.label {{ label }}
  select(@input="$emit('input', {value: $event.target.value, pointer: pointer})", v-model="data.data")
    option(v-for="option in data.source", :value="option.id") {{ option.name }}
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'label', 'pointer', 'source']
}
</script>
