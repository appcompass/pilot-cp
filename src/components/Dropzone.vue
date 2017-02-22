/* global localStorage: false */
<template lang="jade">
form.dropzone
  input(type="hidden", name="disk", value="plus3website_images")
</template>

<script>
import Dropzone from 'dropzone'

export default {
  name: 'Dropzone',
  props: ['url'],
  data () {
    return {
      dropzone: null,
      api: null
    }
  },
  mounted () {
    this.api = process.env.API_SERVER
    this.dropzone = new Dropzone(this.$el, {
      url: this.api + this.url.slice(1),

      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
      }
    })
  }
}
</script>

<style scoped>
@import "~dropzone/dist/min/dropzone.min.css"
</style>
