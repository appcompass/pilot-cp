<template lang="jade">
div#editor
  span(v-for="(item, index) in copy")
    span.title.is-6 {{ item.key }}
    textarea.textarea(v-html="item.value", @input="set", v-model="item.value")
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Code',
  props: ['pointer', 'data', 'source', 'label'],
  data () {
    return {
      copy: []
    }
  },
  mounted () {
    if (_.isEmpty(this.data) && !_.isEmpty(this.source)) {
      if (!_.isEmpty(this.source)) {
        this.source.forEach((item) => {
          this.copy.push({key: item, value: undefined})
        })
      } else {
        console.log('here s the issue')
        this.copy.push({})
        // this.$set(this.copy, {})
        // this.copy.push({key: item, value: undefined})
      }
    } else if (this.data) {
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

<style lang="sass" scoped>
.textarea
  height: 19rem !important
  background: #999 !important
  color: #fff !important
</style>
