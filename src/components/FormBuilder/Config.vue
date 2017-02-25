<template lang="jade">
div
  h1 Config
    ul
      {{ data }}
      li(v-if="copy", v-for="(value, key, index) in copy")
        input(v-model="value.key", @input="set")
        input(v-model="value.value", @input="set")
      li
        a.button.is-primary(@click="copy.push([])") Add
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Config',
  props: ['data', 'pointer', 'source'],
  data () {
    return {
      copy: []
    }
  },
  created () {
    if (_.isEmpty(this.data)) {
      if (!_.isEmpty(this.source)) {
        this.source.forEach((item) => {
          this.copy.push({key: item, value: undefined})
        })
      }
    } else {
      for (let e of Object.keys(this.data)) {
        this.copy.push({key: e, value: this.data[e]})
      }
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
