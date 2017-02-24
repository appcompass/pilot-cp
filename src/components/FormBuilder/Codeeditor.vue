<template lang="jade">
div#editor
    span(v-for="(item, index) in data")
      span.title.is-6 {{ index }}
      textarea.textarea(v-html="item", @input="$emit('input', {pointer: pointer + '.' + index, data: $event.target.value})", v-model="data[index]")
</template>

<script>
// import ace from https://github.com/ajaxorg/ace

// @TODO this works when the incoming data object looks like
// data {
//   layouts: {
//     error:
//     public
//   }
// }
// this will push values composing a sub-pointer that looks like layouts.error or layouts.public
// this is a good generic case for object.sub pointers

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
