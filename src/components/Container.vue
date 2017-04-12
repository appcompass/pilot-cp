<template lang="pug">
div
  div.page-container(v-if="container.section.type === 'container'")
    Sortable(:list="container.children", :options="{animation: 50, group: {name: 'items', pull: true, put: false}}")
      Container(v-for="(sub, index) in container.children", :key="index", :container="sub", @edit="edit")
  div.element(v-if="container.section.type !== 'container'", @click="$emit('edit', container.id)")
    a {{ container.section.name }}
</template>

<script>
import Modal from 'Helpers/Modal'

export default {
  name: 'Container',
  props: [ 'container', 'level' ],
  data () {
    return {
      modal: Modal
    }
  },
  methods: {
    edit (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
