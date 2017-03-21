<template lang="pug">
  div.upload-drop(
    :is="create_type + 'Action'",
  ) Drop files here to upload.
  </template>

<script>
export default {
  name: 'DropzoneAction',
  props: ['model']
}

</script>
