<template lang="pug">
ul
  li(v-for="item in content") {{ item.label }}
</template>

<script>
export default {
  name: 'Checkboxes',
  props: ['content']
}
</script>