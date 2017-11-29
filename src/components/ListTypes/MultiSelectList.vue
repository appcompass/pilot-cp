<template lang="pug">
  div.table-container(
    :class="{'is-opaque': $parent.loading}"
  )
    table.table-default
      thead
        tr
          th Status
          th(v-for="field in forms.form.fields", nowrap)
            span.icon-search.table-column-search-trigger(
              v-if="field.config.searchable",
              @click="$parent.toggleEdit(field)"
            )
            span(
              @click="$parent.toggleSorter(field)",
              :class="{'table-sort': field.config.sortable, 'is-active': $parent.sorters[field.name], 'is-reverse': $parent.sorters[field.name] === 'ASC'}"
            )
              | {{ field.label }}
              span.arrow-down
            form.table-column-search(
              v-if="field.config.searchable",
              :class="{'is-active': forms.edit.indexOf(field.id) > -1}"
            )
              div.search-input
                span.icon-search
                input(
                  type="search",
                  v-model="$parent.search[field.name]",
                  :placeholder="field.label",
                  @keyup="$parent.applyFilter"
                )
                span.icon-cancel(
                  @click="$parent.toggleEdit(field)"
                )
      tbody(v-if="selectable.length")
        tr(v-for="row in selectable")
          td
            .switch.switch-small
              label(:for="'toggle-' + row.id")
                input(type="checkbox", :id="'toggle-' + row.id", :checked="has(row.id)", @click="toggle(row.id)")
          td(v-for="(field, index) in forms.form.fields")
            span(
              v-html="value(field.name, row)"
            )
</template>

<script>
import api from '../../api'

export default {
  name: 'MultiSelectList',
  props: ['forms', 'collection', 'selectable'],
  data() {
    return {
      removed: [],
      added: [],
      owned: [],
      endpoint: undefined
    }
  },
  mounted() {
    this.owned = this.collection.map(i => i.id)
  },
  methods: {
    value(name, row) {
      return _.get(row, name)
    },
    has(id) {
      if (!this.collection) {
        return false
      }
      return this.collection.findIndex(i => i.id === id) > -1
    },
    toggle(id) {
      if (this.has(id)) {
        this.removed.push(id)
      } else {
        this.added.push(id)
      }
      return this.update()
    },
    reset() {
      this.added = []
      this.removed = []
    },
    update() {
      let vm = this
      console.log({ removed: this.removed, added: this.added })
      api
        .post('/api/' + this.$route.path, {
          removed: this.removed,
          added: this.added
        })
        .then(function(response) {
          console.log(response)
          vm.reset()
          // vm.collection = response.data.data
        })
    }
  }
}
</script>
