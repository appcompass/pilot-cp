<template lang="pug">
div
  FormFields(:fields="form.fields" :parent="null" @input="set")
</template>

<script>
import FormFields from 'components/FormFields/FormFields'
import Sortable from 'Helpers/VueSortable'

export default {
  name: 'FormBuilder',
  props: ['form'],
  components: { FormFields },
  computed: {
    form() {
      return this.$store.getters.form
    }
  },
  methods: {
    getPath(fieldname) {
      return fieldname
    },
    value(field, index) {
      return this.form.get(field, index)
    },
    isRequired(field) {
      return field.validation && field.validation.indexOf('required') >= 0
    },
    setData(data) {
      console.log(data)
    },
    // sets a value
    set(data) {
      console.log(data)
    }
  }
}
</script>
