<template>
  <div>
    <p>Hello {{ name }}</p>
    <p>Welcome here!</p>
  </div>
</template>

<script>
export default {
  props: [ 'name' ],
  replace: false,
};
</script>
