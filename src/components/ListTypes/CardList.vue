<template lang="pug">
div.media-cards
  card.media-card(v-for="card, index in form.collection", :info="card", :key="card.id", :url="$route.fullPath + '/' + card.id", @select="select(card)")
</template>

<script>
import _ from 'lodash'
import Form from '../../Helpers/Form'
import Card from '../Global/Card'

let form = new Form()

export default {
  name: 'CardList',
  props: [ 'forms', 'collection' ],
  components: { Card },
  mounted () {
    this.form.init(this.forms.form, this.collection)
  },
  data: () =>  ({ form }),
  methods: {
    select (item) {
      this.$router.push(`${this.$route.fullPath}/${item.id}`)
    },
    value (name, row) {
      return _.get(row, name)
    }
  }
}
</script>
