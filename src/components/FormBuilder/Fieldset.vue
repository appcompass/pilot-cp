<template lang="pug">
  div
    .fieldset(
      :class="{'draggable': true, 'is-closed': field.isCollapsed}"
    )
      .fieldset-header
        .fieldset-heading(
          v-if="field.label",
          v-html="field.label"
        )
        .input-desc(
          v-if="field.help",
          v-html="field.help"
        )
        .fieldset-header-actions
          span.icon.icon-delete(
            v-if="true"
          )
          span.icon.icon-box-down(
            @click="collapse(field)"
          )
      .fieldset-fields
        FormBuilder(
          :form="form",
          :parent="parent"
        )
</template>

<script>
import FormBuilder from 'components/FormBuilder'

export default {
  name: 'Fieldset',
  components: {
    FormBuilder
  },
  props: ['pointer', 'data', 'errors', 'field', 'parent', 'form'],
  methods: {
    collapse (field) {
      this.$set(field, 'isCollapsed', !field.isCollapsed)
    }
  }
}
</script>
