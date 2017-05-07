<template lang="pug">
.modal-holderino(:is="Modals.default[config.type]", @close="close")
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
      cssClass: [this.config.css],
      footer: true,
      stickyFooter: true,
      beforeClose: () => this.$store.dispatch('modal.hide')
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
    config () {
      return this.$store.state.modal.config
    }
  }
}
</script>
