<template lang="pug">
div
  div(v-if="form && form.fields")
    div(
      v-if="Components[field.type]",
      v-for="(field, fieldIndex) in form.fields"
    )
      label
        | {{ field.label }}
        span.required(
          v-if="isRequired(field)"
        )
          ="  *"
      .input-desc {{ field.help }}
      div(
        v-if="!field.config.repeatable",
        :is="Components[field.type]",
        :pointer="getPath(field.name)",
        :data="form.get(field.name)",
        :errors="form.errors",
        :field="field",
        @input="set"
        @disk="disk"
      )
      Sortable(v-if="field.config.repeatable", :list="form.get(field.name)", :element="'div'", :options="{animation: 300, group: 'items'}")
        div(
          v-for="val, index in form.get(field.name)",
          :is="Components[field.type]",
          :form="form.split(field, index)",
          :field="field",
          :errors="form.errors",
          :pointer="field.name",
          @input="set",
          @disk="disk",
          @unlink="unlink(field, index)"
        )
      div.form-error.row(v-if="!Components[field.type]")
        .xsmall-12.columns
          | {{ field.type }} Is not an installed component template.  Please install or create it.
      button.btn-secondary(
        v-if="field.config.repeatable",
        @click.prevent="form.clone(getPath(field.name), fieldIndex)"
      ) Add Row
      ul.form-error
        li(v-for="error in form.errors.get(getPath(field.name))") {{ error }}
</template>

<script>
import * as Components from './Components'
import Sortable from 'Helpers/VueSortable'

export default {
  name: 'FormBuilder',
  props: [ 'form' ],
  components: { Sortable },
  data () {
    return {
      Components,
      subFieldIndex: null
    }
  },
  methods: {
    getPath (fieldname) {
      return fieldname
    },
    value (field, index) {
      return this.form.get(field, index)
    },
    isRequired (field) {
      return field.validation && field.validation.indexOf('required') >= 0
    },
    // sets a value
    set (data) {
      this.form.set(data)
    },
    disk (cb) {
      this.$emit('disk', cb)
    },
    // collapse a structure
    collapse (item, collapsed) {
      this.$set(item, 'isCollapsed', collapsed)
    },
    // remove branch
    unlink (field, index) {
      this.form.collection[field.name].splice(index, 1)
    }
  }
}
</script>
