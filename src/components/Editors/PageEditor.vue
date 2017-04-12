<template lang="pug">
div
  //- {{ form.fields }}
  .columns
    .page.column.is-6
      Sortable(:list="form.collection.data", :options="{animation: 50, group: {name: 'items', pull: true, put: true}}")
        Container(v-for="(container, index) in form.collection.data", :key="index", :container="container", @edit="edit")
    .column.is-6
      //- a.button.is-primary(@click="store") Save
      //- FormBuilder(:form="form.fields", :content="form.collection.page", :errors="form.errors", @set="set")
      //- FormBuilder(v-if="section", :form="section.form", :content="section.content", :errors="form.errors", @set="set")
  //- .columns
    .column.is-full
</template>

<script>
import _ from 'lodash'
import Form from 'Helpers/Form'

import Container from '../Container'
import FormBuilder from '../FormBuilder'

export default {
  name: 'PageEditor',
  components: { Container, FormBuilder },
  props: ['data', 'errors', 'form'],
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
      this.$http.get('/api/pages/' + this.$route.params.id + '/contents/' + id)
        .then(response => {
          let form = new Form()
          form.init(response.data.form, response.data.content)
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
      this.$http.put('/api/pages/' + this.$route.params.id + '/contents/' + this.id, this.content)
        .then(response => {
          this.$swal({title: 'Success', text: 'BOOM! Done!', type: 'success'})
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
