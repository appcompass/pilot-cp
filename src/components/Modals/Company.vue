<template lang="pug">
div
  h1 Select your Company
  table
    tr(v-for="company in companies")
      td {{ company.id }}
      td {{ company.name }}
      td(v-if="current && current.id")
        button.btn-secondary(v-if="current.id !== company.id" @click="setCompany(company.id)") Select
        button.btn-primary(v-else @click="hide") Selected
</template>

<script>
export default {
  name: 'LockScreen',
  methods: {
    check() {
      this.$store.dispatch('modal.done', {})
      // @TODO call auth.check from store
    },
    hide() {
      this.$store.dispatch('modal.hide')
    },
    setCompany(id) {
      this.$store.dispatch('SET_COMPANY', { id })
      this.hide()
    }
  },
  computed: {
    companies() {
      return this.$store.getters.company.available
    },
    current() {
      return this.$store.getters.company.current
    }
  }
}
</script>
