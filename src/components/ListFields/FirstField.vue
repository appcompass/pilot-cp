<template lang="pug">
div
  router-link.table-user-avatar(v-if="row.card_photo && canEdit", :to="{name: getRouteName('show'), params: getRouteParams(row.id)}")
    img(:src="row.card_photo", width="32", height="32")
  a.table-user-avatar(v-else-if="row.card_photo")
    img(:src="row.card_photo", width="32", height="32")
  b(v-if="row.abilities.includes('edit')")
    router-link(:to="{name: getRouteName('show'), params: getRouteParams(row.id)}", v-html="content")
  a(v-else, v-html="value(field.name, row)")
  div.table-row-actions
    router-link.link-primary(v-if="row.abilities.includes('edit')" :to="{name: getRouteName('show'), params: getRouteParams(row.id)}") Edit 
    = " | "
    //- @TODO: add delete ability permissions to resources on API.
    //- v-if="row.abilities.includes('delete')",
    a.link-red(@click="$parent.remove(row.id)") Delete
</template>

<script>
import RouteHandling from 'Mixins/RouteHandling'

export default {
  name: 'FirstFieldList',
  props: ['content', 'row', 'field'],
  mixins: [RouteHandling],
  computed: {
    canEdit() {
      return this.row.abilities.includes('edit')
    }
  }
}
</script>