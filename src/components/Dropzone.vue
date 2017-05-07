/* global localStorage */
<template lang="pug">
form.upload-drop(@input='set') Drop files here to uploads.
</template>

<script>
import Dropzone from 'dropzone'

export default {
  name: 'Dropzone',
  props: ['pointer', 'data', 'label'],
  data () {
    return {
      dropzone: null,
      api: undefined
    }
  },
  mounted () {
    this.api = '/api' + this.$route.fullPath.split('_').join('/')
    this.dropzone = new Dropzone(this.$el, {
      url: this.api,
      autoProcessQueue: true,
      addRemoveLinks: false,
      parallelUploads: 10,
      headers: {
        'Authorization': window.localStorage.getItem('auth_token')
      },
      addedfile: () => {
        if (!this.disk) {
          // this.removeAllFiles()
          // vm.$swal('Error', 'Disk instance not selected', 'error')
        }
      },
      sending (something, xhr, formData) {
        formData.append('disk', this.disk)
      },
      success: (file, response) => {
        this.$emit('input', { pointer: null, value: response.model })
        // this.$swal('Ok', 'Image(s) uploaded', 'success')
        this.dropzone.removeFile(file)
      },
      error: (file, errorMessage, xhr) => {
        // this.$swal('Error', errorMessage.error || 'Failed while uploading the image(s)', 'error')
      }
    })
  },
  computed: {
    disk () {
      return this.$store.state.disks.selected
    }
  },
  methods: {
    set (data) {
      data.pointer = this.pointer
      this.$emit('input', data)
    }
  }
}
</script>
