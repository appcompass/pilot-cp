<template lang="pug">
.media-card
  a.media-card-thumb
    span.thumb-container
      span.thumb-center
        img(:src="url", width="320", height="213")
  ul.media-card-info
    li(v-for="item, key in info")
      span {{ filters.capitalize(key) }}:
      |  {{ item }}
  .media-card-actions
    input.media-card-checkbox.left(type="checkbox", @click="$emit('select')")
    a.media-card-delete.right
      span.icon-delete
      |  Delete
</template>

<script>
// @NOTE emit('select')
// relies on parent knowing what to do with that information

export default {
  name: 'MediaCard',
  props: ['info', 'url'],
  data: () => ({})
}
</script>
