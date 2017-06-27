<template lang="pug">
div
  .lock-screen-user
    .user-avatar
      img(src="https://placehold.it/50x50", width="50", height="50")
    .lock-screen-username john@example.com
  .lock-screen-content
    h1 You've been Idle
    form
      label Enter your password
      input(type="password")
      .align-space-between
        button.btn-primary(@click="check", type="button") Continue
        .link-text-tertiary Go to Log In
</template>

<script>
export default {
  name: 'LockScreen',
  methods: {
    check () {
      this.$store.dispatch('modal.done', {})
      // @TODO call auth.check from store
    }
  }
}
</script>
