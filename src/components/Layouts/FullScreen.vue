<template lang="pug">
.site
  transition(name="fade", mode="out-in")
    router-view
</template>

<script>

export default {
  name: 'FullScreen',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
