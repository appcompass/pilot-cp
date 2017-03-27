<template lang="pug">
ul
  h1.title.is6 {{ label }}
  table.table.is-narrow
    thead
      tr
        th Key
        th Value
    tbody
      tr(v-if="copy", v-for="(value, key, index) in copy")
        td
          p.control
            input.input(v-model="value.key", @input="set")
        td
          span.columns
            p.control.column.is-10
              input.input(v-model="value.value", @input="set")
            span.column.is-2
              a.icon.is-small.pull-left(@click="copy.splice(index, 1)")
                i.fa.fa-close
      tfoot
        tr
          td
            a.button.is-primary(@click="copy.push([])") Add
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Config',
  props: ['data', 'pointer', 'source', 'label'],
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
      } else {
        this.copy.push({})
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
