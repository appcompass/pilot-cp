<template lang="pug">
div
  //- @TODO: split the logic up this field should only handle the single field data, not an array of fields on a repeatable.
  p.control
    label.label {{ label }}
    textarea.textarea(
      rows="20"
      v-if="typeof data === 'string'",
      v-html="data",
      @input="set",
      v-model="data"
    )
    //- editor(
    //-   v-if="typeof data === 'string'",
    //-   :content="data",
    //-   lang="javascript",
    //-   theme="chrome",
    //-   height="300px",
    //-   width="100%",
    //-   sync=false
    //- )
    span(v-else, v-for="(item, index) in copy")
      span.title.is-6 {{ item.key }}
      textarea.textarea(
        rows="20"
        v-html="item.value",
        @input="set",
        v-model="item.value"
      )
      //- editor(
      //-   :content="item.value",
      //-   lang="javascript",
      //-   theme="chrome",
      //-   height="300px",
      //-   width="100%",
      //-   sync=false
      //- )

    p.help.is-danger
      ul
        li(v-for="error in errors.get(pointer)") {{ error }}
    p.help
      | {{ help }}

</template>

<script>
import _ from 'lodash'
  //- @TODO: get the damn brace (used by vue-ace) module to work, I think it doesn't like webpack. https://github.com/thlorenz/brace/issues/46
// import editor from 'vue2-ace'
// import 'brace/mode/javascript'
// import 'brace/theme/monokai'

export default {
  name: 'Code',
  props: ['pointer', 'data', 'label', 'errors', 'help'],
  components: {
    // editor
  },
  data () {
    return {
      elm_id: '',
      theme: '',
      mode: '',
      copy: []
    }
  },
  created () {
    // console.log(this.data)
    this.elm_id = this.pointer.replace(/\./g, '_')
  },
  mounted () {
    // var vm = this
    // vm.$on('editor-update', val => {
    //   console.log(val)
    // })

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
  }
}
</script>
