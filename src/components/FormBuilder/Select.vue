<template lang="jade">
.control
  label.label {{ label }}
  select
    option(v-for="(option, index) in source", :value="option.id || index") {{ option }}
  //- {{ data }} {{ source }}
</template>

<script>
export default {
  name: 'Select',
  props: ['data', 'label', 'pointer', 'source']
}
</script>
