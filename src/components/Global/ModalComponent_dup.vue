<template lang="pug">
  .modal(:class="{'is-active': modal.active}")
    .modal-background
    .modal-content
      .modal-card
        header.modal-card-head
          p.modal-card-title(v-if="modal.form.form.name") {{ modal.form.form.name.charAt(0).toUpperCase() + modal.form.form.name.slice(1) }}
          button.delete(@click.prevent="modal.disable()")
        section.modal-card-body
          FormBuilder(:form="modal.form", @set="set")

        footer.modal-card-foot
          a.button.is-primary(@click="modalDone") Ok
          a.button(@click.prevent="modal.disable()") Cancel
</template>

<script>
import Modal from 'Helpers/Modal'
import * as Components from './../Components'
import FormBuilder from './../FormBuilder'

export default {
  name: 'ModalComponent',
  components: { FormBuilder },
  data () {
    return {
      data: {},
      Components,
      modal: Modal
    }
  },
  methods: {
    set (data) {
      this.modal.form.set(data)
    },
    modalDone () {
      this.modal.done(this.modal.form.collection)
    }
  }
}
</script>
