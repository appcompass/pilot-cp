<template lang="pug">
.page-section {{ element.name }}
</template>

<script>
import Form from 'Helpers/Form'

export default {
  name: 'sectionElement',
  props: ['element'],
  mounted () {
    let form = new Form()
    form.init(this.element.formData(), this.element.collection())
    this.$emit('formData', {
      name: this.element.name,
      form
    })
  }
}
</script>
