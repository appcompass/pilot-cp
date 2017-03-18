<template lang="pug">
  div.table-container
    table
      thead
        tr
          th
            input(type="checkbox" name="" value="")
          th(v-for="field in forms.list.fields", nowrap)
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
      tbody(:class="{'is-opaque': $parent.loading}", v-if="collection.data.data.length")
        tr(v-for="row in collection.data.data")
          td
            input(type="checkbox" name="" value="")
          td(v-for="(field, index) in forms.list.fields")
            //- <a href="#" class="table-user-avatar"><img src="assets/images/avatar_temp.png" width="32" height="32"></a>
            span(
              v-if="index === 0"
            )
              router-link(
                :to="{name: 'edit', params: {model: $route.fullPath.slice(1).split('/').join('_'), id: row.id}}",
                v-html="value(field.name, row)"
              )
              div.table-row-actions
                router-link.link-primary(
                  v-if="row.abilities.includes('edit')",
                  :to="{name: 'edit', params: {model: $route.fullPath.slice(1).split('/').join('_'), id: row.id}}",
                ) Edit
                | |
                //- v-if="row.abilities.includes('delete')",
                a.link-red(
                  @click="$parent.remove(row.id)"
                ) Delete

            span(
              v-if="index > 0",
              v-html="value(field.name, row)"
            )
      tbody(v-else, :class="{'is-opaque': $parent.loading}")
        tr
          td.has-text-centered(:colspan="forms.list.fields.length + 1")
            .notification.is-danger
              .title No results found.
</template>

<script>
// @TODO
//  - only pass list form
import _ from 'lodash'

export default {
  name: 'TableList',
  props: [ 'forms', 'collection' ],
  data () {
    return {
      _
    }
  },
  methods: {
    value (name, row) {
      return _.get(row, name)
    }
  }
}
</script>
