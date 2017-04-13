<template lang="pug">
Sortable(:list="elements", :element="'div'", :options="{group: 'items', animation: 300}")
  div(v-for="(element, index) in elements", :key="index", :is="element.type + 'Element'", :element="element", @formData="formData")
</template>

<script>
import Sortable from 'Helpers/VueSortable'
import containerElement from 'components/PageBuilder/Container'
import sectionElement from 'components/PageBuilder/Section'

export default {
  name: 'PageBuilder',
  props: [ 'elements' ],
  components: { Sortable, containerElement, sectionElement },
  methods: {
    formData (formData) {
      this.$emit('formData', formData)
    }
  }
}
</script>
