/* global localStorage: false */
<template lang="pug">
  form.upload-drop(
    @input='set'
  ) Drop files here to upload.
</template>

<script>
import Dropzone from 'dropzone'
import swal from 'sweetalert'
import Navigation from './States/Navigation'

export default {
  name: 'Dropzone',
  props: ['pointer', 'data', 'label'],
  data () {
    return {
      navigation: Navigation,
      dropzone: null
    }
  },
  mounted () {
    // @TODO: make this work the right way.
    this.$parent.$on('disk', (disk) => {
      console.log(disk)
      if (!disk) {
        swal('Error', 'Disk instance not selected', 'error')
        return
      }
      this.disk = disk
    })

    let vm = this

    this.dropzone = new Dropzone(this.$el, {
      url: '/api' + vm.navigation.current_url,
      autoProcessQueue: true,
      addRemoveLinks: false,
      parallelUploads: 10,
      headers: {
        'Authorization': window.localStorage.getItem('auth_token')
      },
      addedfile () {
        if (!vm.disk) {
          this.removeAllFiles()
          swal('Error', 'Disk instance not selected', 'error')
        }
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
    set (data) {
      data.pointer = this.pointer
      this.$emit('input', data)
    }
  }
}
</script>
