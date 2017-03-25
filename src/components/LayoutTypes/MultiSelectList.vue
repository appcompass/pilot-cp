<template lang="pug">
  section
    ul.columns.is-multiline
      li.column.is-4(v-for="(item, index) in collection")
        .control.is-info
          label.checkbox
            input(type="checkbox", v-bind:checked="has(item.id)", @click="toggle(item.id)")
            //- |  {{ item.label.charAt(0).toUpperCase() + item.label.slice(1) }}
            |  {{ item.name || item.label }}
</template>

<script>
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
      this.$http.post('/api/' + this.$route.path, this.owned)
        .then(function (response) {
          console.log(response)
        })
    }
  }
}
</script>
