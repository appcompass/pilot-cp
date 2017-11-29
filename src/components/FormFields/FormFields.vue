<template lang="pug">
div
  div(v-for="field in fields")

    div(v-if="field.fields.length")
      .fieldset(:class="{'draggable': true, 'is-closed': isCollapsed}")
        .fieldset-header
          .fieldset-heading {{ field.label }}
          .input-desc {{ field.help }}
          .fieldset-header-actions
            span.icon.icon-delete(@click="unlink(field)")
            span.icon.icon-box-down(@click="collapse")
        .fieldset-fields  
          FormFields(:fields="field.fields" :parent="field.name" @input="set")

    div(v-else)
      label {{ field.label }} 
        span.required(v-if="/required/.test(field.validation)") *
        .input-desc {{ field.help }}
      span(:is="field.type + 'Field'" :field="field" :data="getValue(field.name)" @input="set" :errors="errors[field.name]")
        ul.form-error
          li(v-for="error in errors[field.name]") {{ error }}
  div
    pre {{ errors }}
</template>

<script>
import _ from 'lodash'
import * as Components from './ComponentsLibrary'

export default {
  name: 'FormFields',
  props: ['fields', 'parent'],
  components: Components,
  data: () => {
    return {
      isCollapsed: false
    }
  },
  methods: {
    getValue(field) {
      return _.get(this.data, field)
    },
    set(data) {
      if (this.parent !== null) {
        data.pointer = this.parent + '.' + data.pointer
      }
      console.log(data)
      this.$store.dispatch('SET_COLLECTION', {
        pointer: data.pointer,
        value: data.value
      })
    },
    collapse() {
      this.isCollapsed = !this.isCollapsed
    },
    unlink(field, index) {
      console.log(field)
    }
  },
  computed: {
    data() {
      return this.$store.getters.collection(this.parent)
    },
    errors() {
      return this.$store.getters.errors(this.parent)
    }
  }
}
</script>
