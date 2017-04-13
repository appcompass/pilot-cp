<template lang="pug">
  div
    div(
      v-if="form && Components[field.type]",
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
        :data="form.get(getPath(field.name), subIndex)",
        :errors="form.errors",
        :field="field",
        @input="(e) => set(e, fieldIndex)"
        @disk="disk"
      )
      div(
        v-if="field.config && field.config.repeatable",
        v-for="val, index in form.get(getPath(field.name))",
        :is="Components[field.type]",
        :pointer="getPath(field.name)",
        :data="form.get(field.name, index)",
        :errors="form.errors",
        :field="field",
        :index="index",
        :form="form.split(field)",
        :parent="getPath(field.name)",
        @input="(e) => set(e, index)",
        @disk="disk"
      )
      div.form-error.row(v-if="!Components[field.type]")
        .xsmall-12.columns
          | {{ field.type }} Is not an installed component template.  Please install or create it.
      button.btn-secondary(
        v-if="field.config.repeatable",
        @click.prevent="clone(field.name, fieldIndex)"
      ) Add Row
      ul.form-error
        li(v-for="error in form.errors.get(getPath(field.name))") {{ error }}
</template>

<script>
import * as Components from './Components'
import Sortable from 'Helpers/VueSortable'

export default {
  name: 'FormBuilder',
  props: [ 'form', 'parent', 'subIndex' ],
  components: { Sortable },
  data () {
    return {
      Components,
      subFieldIndex: null
    }
  },
  methods: {
    getPath (fieldname) {
      if (fieldname == null) {
        return this.parent == null ? '' : this.parent
      } else {
        return this.parent == null ? fieldname : this.parent + '.' + fieldname
      }
    },
    // adds a repeatable, generating empty objects from forms
    clone (fieldName, fieldIndex) {
      // when cloning check if we're cloning a fieldset or a single repeatable (with multiple values)

      // make sure the content field is able to receive data
      if (!this.form.collection[fieldName]) {
        this.$set(this.form.collection, fieldName, [])
      }
      console.log(this.form.collection[fieldName])
      // Fieldset (we have a fields subset)- get the fields
      if (this.form.fields[fieldIndex].length) {
        let dataObject = Object.create({})
        this.form.fields.forEach((field) => {
          dataObject[field.name] = null
          if (field.fields.length) {
            // @TODO this should become recursive
            console.log('clone sub')
          }
        })
        this.form.collection[fieldName].push(dataObject)

      // Single Field - keep old data and make it an array
      } else {
        if (!Array.isArray(this.form.collection[fieldName])) {
          this.$set(this.form.collection, fieldName, [this.form.collection[fieldName]])
        }
        this.form.collection[fieldName].push('')
      }
    },
    value (field, index) {
      return this.form.get(field, index)
    },
    isRequired (field) {
      return field.validation && field.validation.indexOf('required') >= 0
    },
    // sets a value
    set (data) {
      data.index = this.subIndex
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
