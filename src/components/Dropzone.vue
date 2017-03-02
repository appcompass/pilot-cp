/* global localStorage: false */
<template lang="jade">
form.dropzone
  //- input(type="hidden", name="disk", value="plus3website_images")
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
    this.api = process.env.API_SERVER
    this.dropzone = new Dropzone(this.$el, {
      url: this.api + this.url.slice(1),
      autoProcessQueue: false,
      addRemoveLinks: false,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
      },
      sending (something, xhr, formData) {
        formData.append('disk', vm.disk)
      },
      success (file, response) {
        vm.$emit('input', {pointer: null, value: response.model})
        // console.log(response)
        return true
      }
    })
    this.dropzone.on('addedfile', this.addedfile)
  },
  methods: {
    addedfile (file) {
      // let vm = this
    },
    process () {
      this.$emit('disk-pleez', (disk) => {
        if (!disk) {
          swal('Error', 'Disk instance not selected', 'error')
          // console.error('Disk instance must be specified')
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
