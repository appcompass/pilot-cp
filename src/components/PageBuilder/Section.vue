<template lang="pug">
.page-section {{ element.name }}
</template>

<script>
import Form from 'Helpers/Form'

// this represents a pageSectionContent
// when we initialize a Secion we fire up a Form object and
// then we bubble it up so that the highest level parent
// catches them and displays them.
export default {
  name: 'sectionElement',
  props: ['element'],
  mounted () {
    let form = new Form()
    form.init(this.element.formData(), this.element.collection())
    this.$emit('formData', {
      name: this.element.name,
      instance: this,
      form
    })
  }
}
</script>
