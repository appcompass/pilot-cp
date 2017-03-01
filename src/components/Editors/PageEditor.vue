<template lang="jade">
div
  .columns
    .page.column.is-6
      Container(v-for="container in data.collection.data", :container="container", @edit="edit")
    .column.is-6
      a.button.is-primary(@click="store") Save
      FormBuilder(:form="data.edit.fields", :content="data.collection.page", :errors="errors", @set="set")
      FormBuilder(v-if="section", :form="section.form", :content="section.content", :errors="errors", @set="set")
  .columns
    .column.is-full
</template>

<script>
import swal from 'sweetalert'
import _ from 'lodash'

import Container from '../Container'
import FormBuilder from '../FormBuilder'

export default {
  name: 'PageEditor',
  components: { Container, FormBuilder },
  props: ['data', 'errors'],
  data () {
    return {
      section: null,
      content: null,
      // errors: new Errors(),
      id: null // id being edited,
    }
  },
  methods: {
    value (fieldName) {
      return _.get(this.dataObject, fieldName)
    },
    edit (id) {
      this.id = id
      this.$http.get(process.env.API_SERVER + 'pages/' + this.$route.params.id + '/contents/' + id)
        .then(response => {
          this.section = response.data.collection
          // @TODO backend sends in an empty array instead of object in case no content is present
          if (Array.isArray(response.data.collection.content)) {
            this.content = Object.create({})
          } else {
            this.content = response.data.collection.content
          }
        })
    },
    set (data) {
      console.log(data)
      let pointer = data.pointer.split('.')[0]
      let clone = _.cloneDeep(this.content)
      let content = _.get(clone, pointer)

      // did we find out content is an array?
      if (Array.isArray(content)) {
        if (data.index > -1) {
          clone[pointer][data.index][data.pointer.split('.').pop()] = data.value
        }
      } else {
        _.set(clone, pointer, data.value)
      }
      console.log(clone)
      this.content = Object.assign({}, clone)
      // this.$emit('set', {value: clone, pointer: })
    },
    store () {
      this.$http.put(process.env.API_SERVER + 'pages/' + this.$route.params.id + '/contents/' + this.id, this.content)
        .then(response => {
          swal({title: 'Success', text: 'BOOM! Done!', type: 'success'})
        })
    }
  }
}
</script>

<style lang="sass">
.page
  position: relative
  display: flex
  flex-direction: column
</style>
