<template lang="pug">
  div.media-cards
    div.media-card(v-for="(card, index) in collection")
      //- v-if="card.abilities.includes('edit')",
      //- @TODO: fix, repetative inside the link.
      router-link.media-card-thumb(
        v-if="card.abilities.includes('edit')",
        :to="$parent.formatLink('show', {id: card.id})"
      )
        span.thumb-container
          span.thumb-center
            img(:src="card.card_photo")
      a.media-card-thumb(
        v-else
      )
        span.thumb-container
          span.thumb-center
            img(:src="card.card_photo")
      ul.media-card-info
        li(v-for="(field, index) in forms.form.fields")
          span {{ field.label }}:
          =" "
          | {{ value(field.name, card) }}
      div.media-card-actions
        input.media-card-checkbox.left(type="checkbox")
        //- @TODO: add delete ability permissions to resources on API.
        //- v-if="card.abilities.includes('delete')",
        a.media-card-delete.right(
          @click="$parent.remove(card.id)"
        )
          span.icon-delete
          | Delete
</template>

<script>
// @TODO: most of this is common between list view types, lets consolidate if possible?
import _ from 'lodash'

export default {
  name: 'CardList',
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
