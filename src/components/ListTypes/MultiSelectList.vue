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
      tbody(v-if="collection.length")
        tr(v-for="row in collection")
          td
            .switch.switch-small
              input(type="checkbox", :id="'toggle-' + row.id", v-bind:checked="has(row.id)", @click="toggle(row.id)")
              label(:for="'toggle-' + row.id")
          td(v-for="(field, index) in forms.form.fields")
            span(
              v-html="value(field.name, row)"
            )
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
    value (name, row) {
      return _.get(row, name)
    },
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
