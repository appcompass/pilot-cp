<template lang="jade">
div
  .columns
    .column.is-full
      a.button.pull-right(@click="$router.go(-1)")
        span.icon.is-small
          span.fa.fa-angle-left
        .span Back
  .columns
    .column.is-half
      .content
        h1 Gallery: {{ form.collection.name || 'New Gallery' }}
        p Name: {{ form.collection.name || 'New Gallery' }}
        p Photos: {{ form.collection.photoCount }}
        p Videos: {{ form.collection.videoCount }}
        p Last Updated:
        p Owner: {{ form.collection.user_id }}
    .column.is-half
      FormBuilder(:form="form", @set="set", @disk-pleez="disk")

  .columns
    .column.is-6
      a.button(@click="selectall") Select All
      a.button(@click="selectnone") Deselect All
      a.button(@click="selectinvert") Invert Selection

  Sortable.columns.is-multiline(:list="form.collection.photos", :options="{animation: 150, handle: '.fa-arrows', group: 'items'}", :element="'div'")
    .column.is-3(v-for="(photo, index) in form.collection.photos")
      .card(:class="{selected: isSelected(photo.id)}")
        .card-header
          p.card-header-title {{ photo.path }}
          a.card-header-icon(@click="toggle(photo.id)")
            span.icon.is-small
              i.fa(:class="{'fa-dot-circle-o': isSelected(photo.id), 'fa-circle-o': !isSelected(photo.id)}")
          a.card-header-icon
            span.icon.is-small
              i.fa.fa-arrows
        .card-image
          figure.image
            img(src="https://placehold.it/256x256")
        .card-content
          .content
            p.help
              ul
                li User: {{ photo.user_id }}
                li Path: {{ photo.path }}
                li Url: {{ photo.url }}
                li Created: {{ photo.created_at }}
                li Size: {{ photo.dimensions }}
                li Stoage: {{ photo.storage.name }}

</template>

<script>
import FormBuilder from '../FormBuilder'
import Sortable from '../VueSortable'
import _ from 'lodash'
import moment from 'moment-js'

export default {
  name: 'GalleryEditor',
  props: ['form'],
  components: { FormBuilder, Sortable },
  data () {
    return {
      selected: []
    }
  },
  methods: {
    toggle (index) {
      if (this.selected.indexOf(index) > -1) {
        this.selected.splice(this.selected.indexOf(index), 1)
      } else {
        this.selected.push(index)
      }
    },
    selectall () {
      let all = _.map(this.form.collection.photos, (photo) => {
        return photo.id
      })
      this.selected = all
    },
    selectnone () {
      this.selected.splice(0, this.selected.length)
      moment
    },
    selectinvert () {
      this.form.collection.photos.forEach((photo) => {
        this.toggle(photo.id)
      })
    },
    isSelected (index) {
      return this.selected.indexOf(index) > -1
    },
    set (data) {
      this.$emit('set', data)
    },
    disk (cb) {
      cb(this.form.collection.disk)
    }
  }
}
</script>

<style lang="sass" scoped>
li.gallery
  white-space: nowrap
.card
  transition: all 1s
  .card-header
    transition: all 1s
.selected
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 5px rgba(10, 56, 125, 0.1)
  .card-header
    background-color: rgba(0, 57, 128, 0.2)
.card-header-icon
  color: #333
  padding: 0.5rem 0.25rem
  &:hover
    color: blue
  span
    margin: 0
    padding: 0
.card-content
  overflow: hidden
.icon
  margin-right: 0.5rem
.fa-dot-circle-o
  color: blue
</style>
