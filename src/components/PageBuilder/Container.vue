<template lang="pug">
.page-layout-column(:style="{'width': element.section.config.width ? element.section.config.width : '100%'}")
  .page-layout(:class="{'is-closed': element.isClosed}")
    .page-layout-header {{ element.name }}
      span.page-layout-actions
        span.icon.icon-box-down(v-if="element.type === 'container'", @click="toggle(element)")
        span.icon.icon-delete(@click="remove(element)")
    .page-layout-content
      Sortable(:list="element.children", :options="{group: 'items', animation: 300}")
        div(v-for="single in element.children", :element="single", :key="single.id", :is="single.type + 'Element'", @formData="formData")
        div(v-if="!element.children.length", style="min-height: 30px") Empty
</template>
<span class="nav-item-actions">
  <span class="icon icon-edit"></span>
  <span class="icon icon-box-down"></span></span>
<script>
import Sortable from 'Helpers/VueSortable'
import containerElement from 'components/PageBuilder/Container'
import sectionElement from 'components/PageBuilder/Section'

export default {
  name: 'containerElement',
  props: ['element'],
  components: { Sortable, containerElement, sectionElement },
  methods: {
    formData (formData) {
      this.$emit('formData', formData)
    },
    toggle (element) {
      element.isClosed = !element.isClosed
    },
    remove (element) {
      console.log(element)
      // remove current element from layout.
    }
  }
}
</script>
