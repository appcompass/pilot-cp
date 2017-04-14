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
        :data="form.get(getPath(field.name), subIndex)",
        :errors="form.errors",
        :field="field",
        @input="(e) => set(e, fieldIndex)"
        @disk="disk"
      )
      div(v-if="field.config.repeatable") {{ field.name }} {{ field.type }} {{ form.get(getPath(field.name)) }}
      div(
        v-if="field.config.repeatable || field.fields.length",
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
        @click.prevent="form.clone(field.name, fieldIndex)"
      ) Add Row
      ul.form-error
        li(v-for="error in form.errors.get(getPath(field.name))") {{ error }}

        //- //- a.icon.is-small(v-if="field.config.repeatable", @click="clone(field.name, fieldIndex)")
        //- //-   i.fa.fa-plus
        //- //- //- SINGLE VALUE (single value returned from content for field) @TODO pass whole field directly ffs -f

        //- //- RECURSIVE FORMS (field is not repeatable, it's just a set of children)
        //- div(v-if="field.fields.length && !Array.isArray(value(getPath(field.name)))")
        //-   FormBuilder.fieldset(:form="form.split(field)", :parent="getPath(field.name)", @set="set")

        //- //- MULTI FIELD REPEATABLE SORTABLE (sub-form present, has multiple values and field.config.repeatable is true)
        //- Sortable(v-if="field.config.repeatable && field.fields.length", :list="value(field)", :options="{handle: '.handle', animation: 150, group: 'items'}")
        //-   div(v-for="(val, index) in value(field)")
        //-     span.icon.is-small(@click="collapse(value(field, index), true)", v-if="!value(field, index).isCollapsed")
        //-       i.fa.fa-minus-square-o
        //-     span.icon.is-small(@click="collapse(value(field, index), false)", v-if="value(field, index).isCollapsed")
        //-       i.fa.fa-plus-square
        //-     span  {{ value(field, index).title || '' }}
        //-     a.icon.is-small.pull-right(@click="unlink(field, index)")
        //-       i.fa.fa-trash-o
        //-     a.icon.is-small.pull-right.handle(v-if="value(field, index).isCollapsed")
        //-       i.fa.fa-arrows

        //-     FormBuilder.fieldset(v-if="!val.isCollapsed", :form="form.split(field)", :parent="getPath(field.name)", @set="function(e) { return set(e, index) }")
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
