<template lang="pug">
div
  .page-layout-column(v-if="element.type === 'container'", :style="{'width': element.section.config.width ? element.section.config.width : '100%'}")
    .page-layout(:class="{'is-closed': element.isClosed}")
      .page-layout-header {{ element.name }}
        span.icon.icon-box-down(v-if="element.type === 'container'", @click="toggle")
      .page-layout-content
        Sortable(:list="element.children", :element="'div'", :options="{animation: 300, group: {name: 'items', put: true, pull: true}}")
          PageElement(v-for="single in element.children", :element="single", :key="single.id", @sectionData="sectionData")
  .page-section(v-if="element.type !== 'container'") {{ element.name }}
</template>

<script>
import Sortable from 'Helpers/VueSortable'

export default {
  name: 'PageElement',
  props: ['element'],
  components: { Sortable },
  created () {
    this.emit()
    this.$on('sectionData', function (data) {
      this.$parent.$emit('sectionData', data)
    });
  },
  mounted () {
    // this.$emit('sectionData', { form: this.element.formData(), collection: this.element.collection() })
    // console.log(this.element.getForm())
  },
  methods: {
    sectionData (data) {

      this.$emit('sectionData', data)
    },
    emit () {
      if (this.element.form) {
        this.$parent.$emit('sectionData', {
          id: this.element.id,
          isActive: this.element.isActive,
          name: this.element.name,
          form: this.element.formData(),
          content: this.element.collection()
        })
      }
    },
    toggle () {
      this.$set(this.element, 'isClosed', !this.element.isClosed)
    },
    select () {
      this.$set(this.element, 'isActive', !this.element.isActive)
      // this.emit()
    }
  }
}
</script>

<style>
ul {
  list-style: none;
  margin: 0;
}
</style>
