<template lang="pug">
.media-card(@click="$emit('select', info)")
  a.media-card-thumb
    span.thumb-container
      span.thumb-center
        img(:src="url", width="320", height="213")
  ul.media-card-info
    li(v-for="item, key in info")
      span {{ filters.capitalize(key) }}:
      |  {{ item }}
  .media-card-actions
    input.media-card-checkbox.left(type="checkbox")
    a.media-card-delete.right
      span.icon-delete
      |  Delete
</template>

<script>

export default {
  name: 'Card',
  props: ['info', 'url'],
  data: () => ({})
}
</script>

<style scoped>
.media-card ul.media-card-info li {
  max-width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
