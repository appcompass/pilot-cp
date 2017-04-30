<template lang="pug">
  #app
    //- .site-logout
    //-   .logout-container
    //-     .logout-logo
    //-       img(src="~assets/images/content/logo_color.svg", width="62", height="80")
    //-     .logout-box
    //-       center
    //-         | Loading please wait!
    transition(name="fade", mode="out-in")
      router-view
</template>

<script>
import auth from 'States/Auth.js'
import * as Views from 'components/Layouts'

export default {
  name: 'Main',
  data () {
    return {
      views: Views,
      loading: true,
      auth: auth
    }
  },
  components: {},
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
  }
}
</script>
