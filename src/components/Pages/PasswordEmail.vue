<template lang="pug">
  div
    .logout-box
      p
        | Please enter your email address. We will send you a link to create a new password.
      form
        label(for='') Email Address
        input(type="email", placeholder="Email", v-model="email", @keydown="error = false", @keyup.enter="requestReset")
        button.btn-primary(@click.prevent="requestReset") Reset Password
    router-link.link-text-tertiary.link-icon(
      :to="{name: 'login'}",
    )
      span.icon-arrow-back
      |  Back to Log In
</template>

<script>
import auth from 'States/Auth'

export default {
  name: 'PasswordReset',
  data () {
    return {
      email: null,
      error: false
    }
  },
  methods: {
    requestReset () {
      auth.requestReset(this, this.email)
    }
  }
}
</script>
