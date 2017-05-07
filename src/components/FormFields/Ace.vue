<template lang="pug">
  div(
    :id="id",
    :style="{'height': px(height), 'width': px(width)}"
  ) {{ data }}

</template>

<script>
import * as brace from 'brace'
import 'brace/ext/modelist'
import 'brace/ext/themelist'

const modelist = brace.acequire('ace/ext/modelist')
const themelist = brace.acequire('ace/ext/themelist')

var editor

const regMap = {
  isInt: new RegExp('^\\d+$')
}
export default {
  name: 'Ace',
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: String,
      default: 'pilot-ace-editor'
    },
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '100%'
    },
    mode: {
      type: String,
      default: 'javascript',
      validator: (val) => modelist.modes.findIndex((mode) => mode.name === val) > -1
    },
    theme: {
      type: String,
      default: 'tomorrow_night_eighties',
      validator: (val) => themelist.themes.findIndex((theme) => theme.name === val) > -1
    },
    // todo editor split
    fontsize: {
      type: String,
      default: '12px',
      validator: (val) => parseInt(val) > 11 && parseInt(val) < 25
    },
    codefolding: {
      type: String,
      default: 'markbegin',
      validator: (val) => ['manual', 'markbegin', 'markbeginend'].includes(val)
    },
    // todo key binding
    softwrap: {
      type: String,
      default: 'free',
      validator: (val) => (['off', 'free'].includes(val) || regMap.isInt.test(val))
    },
    selectionstyle: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'line'].includes(val)
    },
    highlightline: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  events:{
  },
  created () {
  },
  mounted () {
    editor = brace.edit(this.id)
    this.setMode()
    this.setTheme()
    editor.$blockScrolling = Infinity
    editor.getSession().on('change', this.emitCode)
  },
  methods: {
    px:function (n) {
      if( /^\d*$/.test(n) ){
          return n+"px";
      }
      return n;
    },
    setMode () {
      let modeObj = modelist.modesByName[this.mode]
      if (modeObj) {
        require('brace/mode/' + modeObj.name)
        editor.getSession().setMode(modeObj.mode)
      }
    },
    setTheme () {
      let themeObj = themelist.themesByName[this.theme]
      if (themeObj) {
        require('brace/theme/' + themeObj.name)
        editor.setTheme(themeObj.theme)
      }
    },
    emitCode () {
      this.$emit('code-change', editor.getValue())
    }
  },
  watch: {
    mode () {
      this.setMode()
    },
    theme () {
      this.setTheme()
    },
    fontsize (newVal) {
      editor.setFontSize(newVal)
    },
    codefolding (newVal) {
      editor.session.setFoldStyle(newVal)
      editor.setShowFoldWidgets(newVal !== 'manual')
    },
    softwrap (newVal) {
      editor.setOption('wrap', newVal)
    },
    selectionstyle (newVal) {
      editor.setOption('selectionStyle', newVal)
    },
    highlightline (newVal) {
      editor.setHighlightActiveLine(newVal)
    }
  }
}
</script>
