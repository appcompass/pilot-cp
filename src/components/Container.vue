<template lang="pug">
div.page-container(v-if="container.section.type === 'container'")
  Container(v-if="container.children", v-for="(sub, index) in container.children", :key="index", :container="sub", @edit="edit")
div.element(v-else, @click="$emit('edit', container.id)")
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
