<template lang="pug">
div.media-cards
  card.media-card(v-for="card, index in form.collection", :info="card", :key="card.id", :url="card.url", @select="select")
</template>

<script>
// @TODO: most of this is common between list view types, lets consolidate if possible?
import _ from 'lodash'
import Form from '../../Helpers/Form'
import Card from '../Global/Card'

let form = new Form()

export default {
  name: 'CardList',
  props: [ 'forms', 'collection' ],
  components: { Card },
  mounted () {
    // @NOTE the way data is bein passed here needs to be less generic
    // collection moved to model would prob make more sense
    this.form.init(this.forms.form, this.collection)
  },
  data: () =>  ({ form }),
  methods: {
    select (item) {
      if (this.form.form.name === 'galleries') {
        this.$router.push(`${this.$route.fullPath}/${item.id}`)
      } else {
        console.log('display photo')
      }
    },
    value (name, row) {
      return _.get(row, name)
    }
  }
}
</script>
