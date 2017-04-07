<template lang="pug">
  div
    .fieldset(
      :class="{'draggable': true, 'is-closed': isCollapsed}"
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
            @click="collapse()"
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
  data () {
    return {
      isCollapsed: false
    }
  },
  methods: {
    collapse () {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>
