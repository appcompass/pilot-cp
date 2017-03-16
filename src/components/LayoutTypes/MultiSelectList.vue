<template lang="jade">
section
  ul.columns.is-multiline
    li.column.is-4(v-for="item in collection.data.data")
      .control.is-info
        label.checkbox
          input(type="checkbox", v-bind:checked="has(item.id)", @click="toggle(item.id)")
          //- |  {{ item.label.charAt(0).toUpperCase() + item.label.slice(1) }}
          |  {{ item.name || item.label }}
</template>

<script>
export default {
  name: 'MultiSelectList',
  props: [ 'forms', 'collection' ],
  data () {
    return {
      endpoint: undefined
    }
  },
  mounted () {
  },
  methods: {
    has (id) {
      if (!this.collection.owned) {
        return
      }
      return this.collection.owned.indexOf(id) > -1
    },
    toggle (id) {
      if (!this.has(id)) {
        this.collection.owned.push(id)
      } else {
        this.collection.owned.splice(this.collection.owned.indexOf(id), 1)
      }
      return this.update()
    },
    update () {
      this.$http.post('/api/' + this.$route.path, this.collection.owned)
        .then(function (response) {
          console.log(response)
        })
    }
  }
}
</script>
