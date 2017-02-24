<template lang="jade">
div#editor
    span(v-for="(item, index) in data")
      span.title.is-6 {{ index }}
      pre
        span {{ item }}
</template>

<script>
// import ace from https://github.com/ajaxorg/ace

export default {
  name: 'Codeeditor',
  props: ['pointer', 'data'],
  data () {
    return {
    }
  },
  beforeDestroy () {
  },
  mounted () {
  }
}
</script>

<style lang="styl">
</style>
