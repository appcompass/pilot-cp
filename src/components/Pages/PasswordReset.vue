<template lang="pug">
  div
    .logout-box
      p Please enter a new password.
      form(v-on:submit.prevent="resetPassword")
        label(for='email') Email Address
        input(type="email", placeholder="Email", :class="{'error': error && response.email}", v-model="email")
        ul.form-error(v-if="error")
          li(v-if="response.email", v-for="line in response.email") {{line}}
        label(for='password') New Password
        input(type="password", name="password", placeholder="Password", :class="{'error': error && response.password}", v-model="password")
        ul.form-error(v-if="error")
          li(v-if="response.password", v-for="line in response.password") {{line}}
        label(for='password_confirmation') Confirm New Password
        input(type="password", name="password_confirmation", placeholder="Confirm Password", :class="{'error': error && response.password_confirmation}", v-model="password_confirmation")
        ul.form-error(v-if="error")
          li(v-if="response.password_confirmation", v-for="line in response.password_confirmation") {{line}}

        div(v-if="error")
          label(v-if="response.token", v-for="line in response.token")
            span.required {{line}}
        button.btn-primary(@click.prevent="resetPassword") Reset Password
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
      token: null,
      email: null,
      password: null,
      password_confirmation: null,
      response: {},
      success: false,
      error: false
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.init()
  },
  watch: {
    'success' (val) {
      if (val) {
        let vm = this
        vm.$swal('Ok', vm.response.status, 'success').then(function(){
          vm.$router.push({ name: 'login' })
        });
      }
    }
  },
  methods: {
    init () {
      let vm = this
      if (vm.$route.params.reset_password) {
        this.token = vm.$route.params.reset_password
      } else {
        vm.$swal('Ok', 'Bad Link!', 'error').then(function(){
          vm.$router.push({ name: 'login' })
        });
      }
    },
    resetPassword () {
      auth.resetPassword(this, {
        token: this.token,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
    }
  }
}
</script>
