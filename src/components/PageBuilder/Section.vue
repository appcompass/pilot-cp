<template lang="pug">
.page-section
  .page-section-header {{ element.name }}
    span.page-section-actions
      span.icon.icon-delete(@click="remove(element)")
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
  methods: {
    remove (element) {
      console.log(element)
      // remove current element from layout.
    }
  },
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
