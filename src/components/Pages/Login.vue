<template lang="pug">
  div
    .logout-box
      form
        label Email Address
        input(type="email", placeholder="Email", v-model="email", @keydown="error = false", @keyup.enter="login")
        label Password
        input(type="password", placeholder="Password", v-model="password", @keyup.enter="login", @keydown="error = false")
        ul.form-error(v-if="error")
          li {{ response.message }}
        .align-space-between
          button.btn-primary(@click.prevent="login") Log In
          router-link.link-text-tertiary(:to="{name: 'request-password-reset'}") Reset Password

    //-
      router-link.link-text-tertiary.link-icon(
        :to="{name: 'register'}",
      )
        span.icon-user
        |  Resgister User
</template>

<script>
export default {
  name: 'LoginView',
  props: ['view'],
  data() {
    return {
      email: null,
      password: null,
      error: false,
      response: undefined
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('ATTEMPT', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/dashboard')
        })
        .catch(error => {
          this.error = error.message
          this.response = { message: error.message }
        })
    }
  }
}
</script>
