<template lang="pug">
  div
    .logout-box
      p
        | Please enter your email address. We will send you a link to create a new password.
      form(v-on:submit.prevent="requestReset")
        label(for='') Email Address
        input(type="email", placeholder="Email", :class="{'error': error}", v-model="email", @keydown="error = false")
        ul.form-error(v-if="error")
          li(v-if="response.email", v-for="line in response.email") {{line}}
        button.btn-primary(@click.prevent="requestReset") Reset Password
    router-link.link-text-tertiary.link-icon(
      :to="{name: 'login'}",
    )
      span.icon-arrow-back
      |  Back to Log In
</template>

<script>
export default {
  name: 'PasswordReset',
  data () {
    return {
      email: null,
      response: {},
      success: false,
      error: false
    }
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
    requestReset () {
      // @TODO vvvvv
      // auth.requestReset(this, {
      //   email: this.email
      // })
    }
  }
}
</script>
