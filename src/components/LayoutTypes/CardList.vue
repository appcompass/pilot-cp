<template lang="jade">
.columns.is-multiline
  .column.is-4(v-for="gallery, index in collection.data.data")
    .card
      .card-image
        figure.image.is-4by3
          img(:src="'http://lorempixel.com/256/256/abstract/' + gallery.id")
      .card-content
        .media
          .media-content
            p.title.is-4 {{ gallery.name }}
            p.subtitle.is-6 {{ gallery.user.email }}

        .content
          ul
            li Photos: {{ gallery.photoCount }}
            li Videos: {{ gallery.videoCount }}
            li Attr3: Val
          p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non officia suscipit quos.
          small(v-moment-ago="gallery.updated_at")
          .pull-right
            router-link.button.is-small.is-warning(v-if="can.has('edit')", :to="{name: 'edit', params: {model: 'galleries', id: gallery.id}}") Edit
            a.button.is-small.is-primary(v-if="!can.has('edit') && can.has('show')") View

</template>

<script>
import Auth from '../Auth'

export default {
  props: ['collection', 'forms'],
  name: 'CardList',
  data () {
    return {
      can: Auth.abilities
    }
  }
}
</script>

<style lang="sass">

</style>
