/* global localStorage */
<template lang="pug">
.upload-drop(@input='set') Drop files here to upload.
</template>

<script>
import Dropzone from 'dropzone'
import swal from 'sweetalert'

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
        'Authorization': this.$store.getters.token
      },
      addedfile: () => {
        if (!this.disk) {
          swal('Error', 'Disk instance not selected', 'error')
        }
      },
      sending: (something, xhr, formData) => {
        formData.append('disk', this.disk)
      },
      success: (file, response) => {
        this.$emit('input', { pointer: null, value: response.model })
      },
      error: (file, errorMessage, xhr) => {
        swal('Error', errorMessage.error || 'Failed while uploading the image(s)', 'error')
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

