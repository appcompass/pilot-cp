<template lang="pug">
div
  .control
    label.checkbox
      input(type="checkbox", v-model="edit")
      |  Change Password
  .control(v-if="edit")
    input.input(type="password", v-model="password", placeholder="Password", @input="input", :class="{'is-danger': errors}")
    input.input(type="password", v-model="password_confirmation", placeholder="Password Again", @input="input", :class="{'is-danger': errors}")

</template>

<script>
export default {
  name: 'secret',
  props: ['errors', 'field'],
  data () {
    return {
      edit: false,
      password: undefined,
      password_confirmation: undefined
    }
  },
  methods: {
    input () {
        this.$emit('input', {value: this.password, pointer: this.field.name})
        this.$emit('input', {value: this.password_confirmation, pointer: this.field.name + '_confirmation'})
    }
  }
}
</script>
