<template lang="pug">
div(:is="config.type", @close="close", v-if="visible")
</template>

<script>
import { Media, Photo, SwapMedia, LockScreen, Company } from '../Modals'
const tingle = window.tingle

export default {
  name: 'Modal',
  components: { Media, Photo, SwapMedia, LockScreen, Company },
  data: () => ({
    visibility: false
  }),
  methods: {
    close() {
      this.$store.dispatch('modal.hide')
    }
  },
  watch: {
    visibility: function(nv) {
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
    visible() {
      this.visibility = this.$store.getters.visible
      return this.$store.getters.visible
    },
    config() {
      return this.$store.getters.config
    }
  }
  // watch: {
  //   vibile: function(nv) {
  //     console.log('Modal Visibility: ' + nv)
  //     if (nv) {
  //       this.modal = new tingle.modal({
  //         cssClass: [this.config.css],
  //         footer: true,
  //         stickyFooter: true,
  //         beforeClose: () => this.$store.dispatch('modal.hide')
  //         // beforeClose: () => this.config.canClose
  //       })
  //       this.modal.setContent(this.$el)
  //       this.modal.open()
  //     } else {
  //       this.modal.close()
  //     }
  //   }
  // }
}
</script>
