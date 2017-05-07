<template lang="pug">
div
  .control
    label.checkbox
      input(type="checkbox", v-model="edit")
      |  Change Password
  .control(v-if="edit")
    input.input(type="password", v-model="pass1", placeholder="Password", @input="input", :class="{'is-danger': errors}")
  .control(v-if="edit")
    input.input(type="password", v-model="pass2", placeholder="Password Again", @input="input", :class="{'is-danger': errors}")

</template>

<script>
export default {
  name: 'secret',
  props: ['errors', 'field'],
  data () {
    return {
      edit: false,
      pass1: undefined,
      pass2: undefined,
      matching: false
    }
  },
  methods: {
    input () {
      if (this.pass1 === this.pass2) {
        this.matching = true
        this.$emit('input', {value: this.pass1, pointer: this.field.name})
      } else {
        this.matching = false
      }
    }
  }
}
</script>
