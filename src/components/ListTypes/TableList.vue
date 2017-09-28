<template lang="pug">
  div.table-container(:class="{'is-opaque': $parent.loading}")
    table.table-default
      thead
        tr
          th
            input(type="checkbox" name="" value="")
          th(v-for="(field, index) in forms.form.fields", nowrap)
            span.icon-search.table-column-search-trigger(v-if="field.config.searchable", @click="toggleEdit(field, index)")
            span(@click="toggleSorter(field)", :class="{'table-sort': field.config.sortable, 'is-active': $parent.sorters[field.name], 'is-reverse': $parent.sorters[field.name] === 'ASC'}") {{ field.label }}
              span.arrow-down
            form.table-column-search(:class="{'is-active': edit.indexOf(field.id) > -1}", @submit.prevent="")
              div.search-input
                span.icon-search
                input(v-if="edit.indexOf(field.id) > -1", type="search", v-model="search[field.name]", :placeholder="field.label", @keyup="$emit('search', search)", ref="field")
                span.icon-cancel(@click="toggleEdit(field, index)")
      tbody(v-if="collection.length")
        tr(v-for="row in collection")
          td
            input(type="checkbox" name="" value="")
          td(v-for="(field, index) in forms.form.fields")
            span(v-if="index === 0")
              router-link.table-user-avatar(
                v-if="row.card_photo && row.abilities.includes('edit')",
                :to="{name: getRouteName('show'), params: getRouteParams(row.id)}",
              )
                img(:src="row.card_photo", width="32", height="32")
              a.table-user-avatar(v-else if="row.card_photo")
                img(:src="row.card_photo", width="32", height="32")
              b(v-if="row.abilities.includes('edit')")
                router-link(
                  :to="{name: getRouteName('show'), params: getRouteParams(row.id)}",
                  v-html="value(field.name, row)"
                )
              a(v-else, v-html="value(field.name, row)")
              div.table-row-actions
                router-link.link-primary(
                  v-if="row.abilities.includes('edit')",
                  :to="{name: getRouteName('show'), params: getRouteParams(row.id)}",
                ) Edit
                = " | "
                //- @TODO: add delete ability permissions to resources on API.
                //- v-if="row.abilities.includes('delete')",
                a.link-red(@click="$parent.remove(row.id)") Delete

            span(v-if="index > 0", v-html="value(field.name, row)")
</template>
<script>
import _ from 'lodash'
import RouteHandling from 'Mixins/RouteHandling'

export default {
  name: 'TableList',
  mixins: [RouteHandling],
  props: [ 'forms', 'collection', 'search', 'sorters', 'edit' ],
  data () {
    return {
      _
    }
  },
  methods: {
    value (name, row) {
      return _.get(row, name)
    },
    toggleSorter (field, index) {
      if (!field.config.sortable) {
        return
      }
      let sorter = this.sorters[field.name]
      switch (sorter) {
        case 'ASC':
          this.$set(this.sorters, field.name, 'DESC')
          break
        case 'DESC':
          this.$delete(this.sorters, field.name)
          break
        default:
          this.$set(this.sorters, field.name, 'ASC')
      }
      this.$emit('sort', this.sorters)
    },
    toggleEdit (field, index) {
      if (this.edit.indexOf(field.id) > -1) {
        delete this.search[field.name]
        this.edit.splice(this.edit.indexOf(field.id), 1)
        this.$emit('search', this.search)
      } else {
        this.edit.push(field.id)
        if (index) {
          // this.$refs.field[index].focus()
          setTimeout(() => {
            this.$refs.field[index].focus()
          }, 400)
        }
      }
    }
  }
}
</script>
