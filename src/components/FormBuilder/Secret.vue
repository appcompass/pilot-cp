<template lang="jade">
div
  .control
    label.checkbox
      input(type="checkbox", v-model="edit")
      |  Change Password
  .control(v-if="edit")
    input.input(type="password", v-model="pass1", placeholder="Password", @input="input", :class="{'is-danger': errors}")
  .control(v-if="edit")
    input.input(type="password", v-model="pass2", placeholder="Password Again", @input="input", :class="{'is-danger': errors}")

  p.help(v-if="errors")
    ul
      li(v-for="error in errors") {{ error }}

</template>

<script>
export default {
  name: 'secret',
  props: ['pointer', 'errors'],
  data () {
    return {
      edit: false,
      pass1: undefined,
      pass2: undefined
    }
  },
  methods: {
    input () {
      if (this.pass1 === this.pass2) {
        this.errors.push(['Passwords do not match.'])
        this.$emit('input', {value: this.pass1, pointer: this.pointer})
      }
    }
  }
}
</script>
