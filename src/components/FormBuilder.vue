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
      //- Regular field
      span(v-if="!field.fields.length && !field.config.repeatable")
        div(:is="Components[field.type]", :data="form.get(field.name)", :errors="form.getErrors(field.name)", :field="field", @input="set", @disk="disk")
      //- Non repeatable sub forms
      div(v-if="field.fields.length && !field.config.repeatable", :is="Components[field.type]", :form="form.split(field)", :field="field", :data="form.get(field.name)", :errors="form.getErrors(field.name)", @input="set", @disk="disk", @unlink="unlink(field)")
      //- repeatable, both with sub-form and single field
      Sortable(v-if="field.config.repeatable", :list="form.get(field.name)", :element="'div'", :options="{animation: 300, group: 'items'}")
        div(v-for="val, index in form.get(field.name)", :is="Components[field.type]", :form="form.split(field, index)", :data="form.get(field.name, index)", :field="field", :errors="form.getErrors(field.name, index)", @input="e => form.set(e, index)", @disk="disk", @unlink="unlink(field, index)")
        button.btn-secondary(v-if="field.config.repeatable", @click.prevent="form.clone(getPath(field.name), fieldIndex)") Add Row
      div.form-error.row(v-if="!Components[field.type]")
        .xsmall-12.columns
          | {{ field.type }} Is not an installed component template.  Please install or create it.
      ul.form-error
        li(v-for="error in form.getErrors(field.name)") {{ error }}
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
      Components
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
    set (data, index) {
      // index only applies to single field repeatables
      this.form.set(data, index)
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
