<template lang="pug">
div
  //- @TODO: split the logic up this field should only handle the single field data, not an array of fields on a repeatable.
  p.control
    label.label {{ label }}
    editor(
      :id="elm_id",
      v-if="typeof data === 'string'",
      fontsize="16px",
      :data="data"
    )
    span(v-else, v-for="(item, index) in copy")
      span.title.is-6 {{ item.key }}
      editor(
        :id="elm_ids[index]",
        fontsize="16px",
        :data="item.value"
      )

    p.help.is-danger
      ul
        li(v-for="error in errors") {{ error }}
    p.help
      | {{ help }}

</template>

<script>
import _ from 'lodash'
import editor from './Ace'

export default {
  name: 'Code',
  props: ['field', 'data', 'label', 'errors', 'help'],
  components: {
    editor
  },
  data () {
    return {
      elm_id: '',
      elm_ids: [],
      copy: []
    }
  },
  events:{
  },
  created () {
    var baseName = this.field.name.replace(/\./g, '_')
    if (typeof this.data === 'string') {
      this.elm_id = baseName
    } else {
      for (let name in this.data) {
        this.elm_ids.push(baseName + '_' + name)
      }
    }
  },
  mounted () {
    if (_.isEmpty(this.data) && !_.isEmpty(this.source)) {
      if (!_.isEmpty(this.source)) {
        this.source.forEach((item) => {
          this.copy.push({key: item, value: ''})
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
  },
  watch: {
  }
}
</script>
