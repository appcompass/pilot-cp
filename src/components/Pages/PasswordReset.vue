<template lang="pug">
  div
    .logout-box
      p Please enter a new password.
      form
        label(for='') New Password
        input(type="password", placeholder="Password", v-model="password", @keyup.enter="login", @keydown="error = false")
        label(for='') Confirm New Password
        input(type="password", placeholder="Confirm Password", v-model="password_confirmation", @keyup.enter="login", @keydown="error = false")
        button.btn-primary(@click.prevent="resetPassword") Reset Password
    router-link.link-text-tertiary.link-icon(
      :to="{name: 'login'}",
    )
      span.icon-arrow-back
      |  Back to Log In
</template>

<script>
import auth from './../../States/Auth'

export default {
  name: 'PasswordEmail',
  data () {
    return {
      password: null,
      password_confirmation: null,
      error: false
    }
  },
  methods: {
    resetPassword () {
      auth.resetPassword(this, this.password, this.password_confirmation)
    }
  }
}
</script>
