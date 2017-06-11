<template lang="pug">
  section
    ul.checkbox-group
      li(
        v-for="(item, index) in collection"
      )
        input(type="checkbox", v-bind:checked="has(item.id)", @click="toggle(item.id)")
        label(
          @click="toggle(item.id)"
        ) {{ item.name || item.label }}
</template>

<script>
import api from '../../api'

export default {
  name: 'MultiSelectList',
  props: ['forms', 'collection', 'owned'],
  data () {
    return {
      endpoint: undefined
    }
  },
  mounted () {
  },
  methods: {
    has (id) {
      if (!this.owned) {
        return false
      }
      return this.owned.indexOf(id) > -1
    },
    toggle (id) {
      if (this.has(id)) {
        this.owned.splice(this.owned.indexOf(id), 1)
      } else {
        this.owned.push(id)
      }
      return this.update()
    },
    update () {
      api.post('/api/' + this.$route.path, this.owned)
        .then(function (response) {
          console.log(response)
        })
    }
  }
}
</script>
