<template lang="pug">
  #app
    transition(name="fade", mode="out-in")
      router-view
</template>

<script>
/* global localStorage: false */

export default {
  name: 'app',
  created () {
    this.initApi()
    this.csrf()
  },
  mounted () {
    this.$store.dispatch('fetch')
  },
  methods: {
    csrf () {
      let vm = this
      vm.$http.get('/api/web-forms/token')
        .then((response) => {
          localStorage.setItem('csrf_token', response.data)
          vm.axios.defaults.headers.common['X-Csrf-Token'] = response.data
        })
    },
    initApi () {
      let vm = this
      vm.axios.defaults.headers.common['X-Csrf-Token'] = localStorage.getItem('csrf_token') || ''
      vm.axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token') || ''
      // vm.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
      // vm.axios.options.root = ''

      vm.axios.interceptors.response.use(function (response) {
        if (response.headers['authorization']) {
          localStorage.setItem('auth_token', response.headers['authorization'])
          vm.axios.defaults.headers.common['Authorization'] = response.headers['authorization']
        }
        return response
      }, function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            // vm.$swal('Unauthorized', error.response.data || 'You are not authorized to perform this action.', 'error')
            // Auth.logout()
          }
          if (error.response.status === 403) {
            // vm.$swal('Unauthorized', error.response.data || 'You are not authorized to perform this action.', 'error')
          }
          if (error.response.status === 404) {
            // vm.$swal('Not Found', error.response.data || 'Resource not found.', 'error')
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        return Promise.reject(error)
      })
    }
  }

}

</script>
