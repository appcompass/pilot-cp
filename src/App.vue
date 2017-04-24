<template lang="pug">
  App
</template>

<script>
import App from './components/Main'

export default {
  name: 'app',
  mounted () {
    this.$store.dispatch('fetch')
  },
  components: {
    App
  }
}
</script>
