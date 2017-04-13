<template lang="pug">
.page-layout-column(:style="{'width': element.section.config.width ? element.section.config.width : '100%'}")
  .page-layout(:class="{'is-closed': element.isClosed}")
    .page-layout-header {{ element.name }}
      span.icon.icon-box-down(v-if="element.type === 'container'")
    .page-layout-content
      Sortable(:list="element.children", :options="{group: 'items', animation: 300}")
        div(v-for="single in element.children", :element="single", :key="single.id", :is="single.type + 'Element'")
        div(v-if="!element.children.length", style="min-height: 30px") Empty
</template>

<script>
import Sortable from 'Helpers/VueSortable'
import containerElement from 'components/PageBuilder/Container'
import sectionElement from 'components/PageBuilder/Section'

export default {
  name: 'containerElement',
  props: ['element'],
  components: { Sortable, containerElement, sectionElement }
}
</script>
