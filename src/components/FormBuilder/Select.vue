<template lang="jade">
.control
  label.label {{ label }}
  select
  {{ data }} {{ source }}
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'label', 'pointer', 'source']
}
</script>
