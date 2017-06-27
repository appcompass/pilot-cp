<template lang="pug">
  div
    .logout-box
      p Please enter the following information to register your account.
      form
        label(for='') First Name
        input(type='text')
        label(for='') Last Name
        input(type='text')
        label(for='') Email
        input(type='email')
        label(for='') Phone
        input(type='text')
        label(for='') Password
        input(type='password')
        label(for='') Confirm Password
        input(type='password')
        button.btn-primary(@click.prevent="register") Register
    router-link.link-text-tertiary.link-icon(
      :to="{name: 'login'}",
    )
      span.icon-arrow-back
      |  Back to Log In

</template>

<script>
// import auth from 'States/Auth'
// @TODO: Use FormBuilder for above since we don't know the any new fields that will
// be needed in any given implementation.
export default {
  name: 'Register',
  data () {
    return {
      form: null,
      error: false
    }
  },
  methods: {
    // @TODO
    // register () {
    //   auth.register(this, this.form)
    // }
  }
}
</script>
