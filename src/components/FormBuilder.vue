<template lang="jade">
div
  span(v-if="form", v-for="(field, fieldIndex) in form.fields")
    label.label(v-if="!field.config.repeatable") {{ field.label }}
    a.icon.is-small(v-if="field.config.repeatable", @click="clone(field.name, fieldIndex)")
      i.fa.fa-plus
    //- SINGLE VALUE (single value returned from content for field)
    span(
        v-if="!Array.isArray(value(field))",
        :is="Components[field.type]",
        :pointer="getPath(field.name)",
        :data="form.get(getPath(field.name))",
        :errors="form.errors",
        :source="field.source",
        :help="field.help",
        @input="set",
        @disk="disk"
      )

    //- RECURSIVE FORMS (field is not repeatable, it's just a set of children)
    div(v-if="field.fields.length && !Array.isArray(value(getPath(field.name)))")
      FormBuilder.fieldset(:form="form.split(field)", :parent="getPath(field.name)", @set="set")

    //- MULTI FIELD REPEATABLE SORTABLE (sub-form present, has multiple values and field.config.repeatable is true)
    Sortable(v-if="field.config.repeatable && field.fields.length", :list="value(field)", :options="{handle: '.handle', animation: 150, group: 'items'}")
      div(v-for="(val, index) in value(field)")
        span.icon.is-small(@click="collapse(value(field, index), true)", v-if="!value(field, index).isCollapsed")
          i.fa.fa-minus-square-o
        span.icon.is-small(@click="collapse(value(field, index), false)", v-if="value(field, index).isCollapsed")
          i.fa.fa-plus-square
        span  {{ value(field, index).title || '' }}
        a.icon.is-small.pull-right(@click="unlink(field, index)")
          i.fa.fa-trash-o
        a.icon.is-small.pull-right.handle(v-if="value(field, index).isCollapsed")
          i.fa.fa-arrows

        FormBuilder.fieldset(v-if="!val.isCollapsed", :form="form.split(field)", :parent="getPath(field.name)", @set="function(e) { return set(e, index) }")
</template>

<script>
import * as Components from './Components'
import Sortable from './VueSortable'

export default {
  name: 'FormBuilder',
  props: [ 'form', 'parent' ],
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

      // Fieldset (we have a fields subset)- get the fields
      if (this.form[fieldIndex].fields.length) {
        let dataObject = Object.create({})
        this.form[fieldIndex].fields.forEach((field) => {
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
    // sets a value
    set (data, index) {
      this.$emit('set', {value: data.value, pointer: data.pointer, index: index})
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

<style lang="sass">
.fieldset
  border: 1px solid #ddd
  box-shadow: 5px 5px 10px #ddd
  padding: 1rem
</style>
