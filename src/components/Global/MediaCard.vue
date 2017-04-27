<template lang="pug">
.media-card(@click="$emit('select', {media: media})")
  a.media-card-thumb
    span.thumb-container
      span.thumb-center
        img(:src="media.path", width="320", height="213")
  ul.media-card-info
    li
      span Status:
      |  Active
    li
      span Type:
      |  N/A
    li
      span Dimensions:
      |  3264 x 2448
    li
      span Uploaded By:
      |  Michael
    li
      span Uploaded On:
      |  2017-10-07
  .media-card-actions
    input.media-card-checkbox.left(type="checkbox")
    a.media-card-delete.right
      span.icon-delete
      |  Delete
</template>

<script>
export default {
  name: 'MediaCard',
  props: ['media'],
  data: () => ({})
}
</script>
