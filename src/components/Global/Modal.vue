<template lang="pug">
.modal-holder
  div(:is="Modals[type]", @close="close")
</template>

<script>
import * as Modals from '../Modals'
const tingle = window.tingle

export default {
  name: 'Modal',
  data: () => ({
    modal: undefined,
    Modals
  }),
  methods: {
    close () {
      this.$store.dispatch('modal.hide')
    }
  },
  mounted () {
    this.modal = new tingle.modal({
      cssClass: ['add-media-modal'],
      footer: true,
      stickyFooter: true,
    })
    this.modal.setContent(this.$el)
  },
  watch: {
    visible (nv) {
      if (nv) {
        this.modal.open()
      } else {
        this.modal.close()
      }
    }
  },
  computed: {
    visible () {
      return this.$store.state.modal.visible
    },
    type () {
      return this.$store.state.modal.type
    }
  }
}
</script>
