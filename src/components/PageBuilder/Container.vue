<template lang="pug">
.page-layout-column(:style="{'width': element.section.config.width ? element.section.config.width : '100%'}")
  .page-layout(:class="{'is-closed': element.isClosed}")
    .page-layout-header {{ element.name }}
      span.page-layout-actions
        span.icon.icon-box-down(v-if="element.type === 'container'", @click="toggle(element)")
        span.icon.icon-delete(@click="$emit('remove', [index])")
    .page-layout-content
      Sortable(:list="element.children", :options="{group: 'items', animation: 300}")
        div(v-for="(single, index) in element.children", :key="index", :is="single.type + 'Element'", :element="single", :index="index", @formData="formData", @remove="remove")
        div(v-if="!element.children.length", style="min-height: 30px") Empty
</template>

<script>
import Sortable from 'Helpers/VueSortable'
import containerElement from 'components/PageBuilder/Container'
import sectionElement from 'components/PageBuilder/Section'

export default {
  name: 'containerElement',
  props: ['element', 'index'],
  components: { Sortable, containerElement, sectionElement },
  methods: {
    formData (formData) {
      this.$emit('formData', formData)
    },
    toggle (element) {
      element.isClosed = !element.isClosed
    },
    remove (data) {
      let path = [this.index, 'children'].concat(data)
      this.$emit('remove', path)
    }
  }
}
</script>
