<template lang="pug">
div 
  .switch.switch-small
    input(type="checkbox" v-model="edit" :id="'toggle-' + _uid" :checked="edit")
    label(:for="'toggle-' + _uid")
  .control(v-if="edit")
    input.input(type="password" v-model="password" placeholder="Password" @input="input" :class="{'error': errors}")
    input.input(type="password" v-model="password_confirmation" placeholder="Password Again" @input="input" :class="{'error': errors}")
    slot

</template>

<script>
export default {
  name: 'secret',
  props: ['errors', 'field'],
  data() {
    return {
      uid: this._uid,
      edit: false,
      password: undefined,
      password_confirmation: undefined
    }
  },
  methods: {
    input() {
      this.$emit('input', { value: this.password, pointer: 'password' })
      this.$emit('input', {
        value: this.password_confirmation,
        pointer: this.field.name + '_confirmation'
      })
    },
    toggle() {
      console.log('here')
      this.edit = false
    }
  }
}
</script>
