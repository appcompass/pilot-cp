/* global localStorage: false */
<template lang="jade">
form.dropzone
  a.button(@click="process") Process
</template>

<script>
import Dropzone from 'dropzone'
import swal from 'sweetalert'

export default {
  name: 'Dropzone',
  props: ['url'],
  data () {
    return {
      dropzone: null,
      disk: null,
      api: null
    }
  },
  mounted () {
    let vm = this
    this.dropzone = new Dropzone(this.$el, {
      url: '/api/' + this.url.slice(1),
      autoProcessQueue: false,
      addRemoveLinks: false,
      parallelUploads: 10,
      headers: {
        'Authorization': window.localStorage.getItem('auth_token')
      },
      sending (something, xhr, formData) {
        formData.append('disk', vm.disk)
      },
      success (file, response) {
        vm.$emit('input', {pointer: null, value: response.model})
        swal('Ok', 'Image(s) uploaded', 'success')
        vm.dropzone.removeFile(file)
      },
      error (file, errorMessage, xhr) {
        swal('Error', errorMessage.error || 'Failed while uploading the image(s)', 'error')
      }
    })
  },
  methods: {
    process () {
      this.$emit('disk', (disk) => {
        if (!disk) {
          swal('Error', 'Disk instance not selected', 'error')
          return
        }
        this.disk = disk
        this.dropzone.processQueue()
      })
    }
  }
}
</script>

<style scoped>
@import "~dropzone/dist/min/dropzone.min.css"
</style>
