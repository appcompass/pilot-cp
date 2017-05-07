<template lang="pug">
  div
    .logout-box
      form
        label(for='') Email Address
        input(type="email", placeholder="Email", v-model="email", @keydown="error = false", @keyup.enter="login")
        label(for='') Password
        input(type="password", placeholder="Password", v-model="password", @keyup.enter="login", @keydown="error = false")
        ul.form-error(
          v-if="error"
        )
          li {{ response.message }}
        .align-space-between
          button.btn-primary(@click.prevent="login") Log In
          router-link.link-text-tertiary(
            :to="{name: 'request-password-reset'}",
          ) Reset Password

    //-
      router-link.link-text-tertiary.link-icon(
        :to="{name: 'register'}",
      )
        span.icon-user
        |  Resgister User
</template>

<script>
import auth from 'States/Auth'

export default {
  name: 'LoginView',
  props: ['view'],
  data () {
    return {
      email: null,
      password: null,
      error: false,
      response: undefined
    }
  },
  methods: {
    login () {
      auth.login(this, this.email, this.password)
    }
  }
}
</script>
