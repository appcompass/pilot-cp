<template lang="pug">
div(:is="Modals[config.type]", @close="close", v-if="visible")
</template>

<script>
// @NOTE this way of importing makes accessing single items awkward
// import { foo } from './Bar' does not work
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
  },
  watch: {
    visible (nv) {
      console.log('Modal Visibility: ' + nv)
      if (nv) {
        this.modal = new tingle.modal({
          cssClass: [this.config.css],
          footer: true,
          stickyFooter: true,
          beforeClose: () => this.$store.dispatch('modal.hide')
          // beforeClose: () => this.config.canClose
        })
        this.modal.setContent(this.$el)
        this.modal.open()
      } else {
        this.modal.close()
      }
    }
  },
  computed: {
    visible () {
      // return false
      return this.$store.state.modal.visible
    },
    config () {
      return this.$store.state.modal.config
    }
  }
}
</script>
