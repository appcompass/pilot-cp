<template lang="jade">
div
  h1 Config
    ul
      li(v-for="(value, key, index) in copy")
        input(v-model="value.key", @input="set")
        input(v-model="value.value", @input="set")
      li
        a.button.is-primary(@click="copy.push([])") Add
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'Config',
  props: ['data', 'pointer'],
  data () {
    return {
      copy: []
    }
  },
  created () {
    for (let e of Object.keys(this.data)) {
      this.copy.push({key: e, value: this.data[e]})
    }
  },
  methods: {
    set (event) {
      let res = {}
      this.copy.forEach(function (item) {
        res[item.key] = item.value
      })
      this.$emit('input', {pointer: this.pointer, value: res})
    }
  }
}
</script>
