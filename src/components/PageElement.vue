<template lang="pug">
.page-layout-column(:style="{'width': element.section.config.width ? element.section.config.width : '100%'}")
  .page-layout(:class="{'is-closed': element.isClosed}")
    .page-layout-header(:style="{background: element.type !== 'container' ? '#ccc' : ''}") {{ element.name }}
      span.icon.icon-box-down(v-if="element.type === 'container'", @click="toggle")
    .page-layout-content
      Sortable(:list="element.children", :element="'div'", :options="{animation: 300, group: {name: 'items', put: true, pull: true}}")
        PageElement(v-for="single in element.children", :element="single", :key="single.id")
      Sortable(v-if="!element.children.length && element.type === 'container'", :element="'div'", :list="element.children", :options="{animation: 300, group: {name: 'items', put: true, pull: true}}")
        div(style="height: 1rem; width: 100%; background: #eee; margin: 0.3rem; margin-top: 0")
</template>

<script>
import Sortable from 'Helpers/VueSortable'

export default {
  name: 'PageElement',
  props: ['element'],
  components: { Sortable },
  created () {
    // this.emit()
    // this.$on('sectionData', function (data) {
    //   this.$parent.$emit('sectionData', data)
    // });
  },
  mounted () {
  },
  methods: {
    emit () {
      // if (this.section.form) {
      //   this.$parent.$emit('sectionData', {
      //     id: this.section.id,
      //     isActive: this.section.isActive,
      //     name: this.section.section.name,
      //     form: this.section.form,
      //     content: this.section.content
      //   })
      // }
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
