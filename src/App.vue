<template lang="pug">
  #app
    transition(name="fade", mode="out-in")
      router-view
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$store.dispatch('CHECK_AUTH')
      .then(() => {})
      .catch((e) => console.error('Needs to login'))
  }
}

</script>
