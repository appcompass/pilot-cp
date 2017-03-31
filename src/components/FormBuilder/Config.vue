<template lang="pug">
.repeatable-fieldset
  table
    thead
      tr
        th
          | Key
          .input-desc This is an input description.
        th
          | Value
          .input-desc This is an input description.
        th.rf-actions
    tbody

      tr(v-if="copy", v-for="(value, key, index) in copy")
        td
          input.input(v-model="value.key", @input="set")
        td
          input.input(v-model="value.value", @input="set")
        td.rf-actions
          a.link-icon.link-red(
            @click="copy.splice(index, 1)"
          )
            span.icon-delete
  button.btn-secondary(
    @click.prevent="copy.push([])"
  ) Add Row
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
