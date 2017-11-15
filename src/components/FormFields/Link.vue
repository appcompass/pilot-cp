<template lang="pug">
div
  .link-inputs
    .row
      .xsmall-6.columns
        .select.link-types
          select(v-model="content.type")
            option Select Link Type
            option(value="page") Page Link
            option(value="model") Model Link
            option(value="external") External Link
          span.icon-select
      .xsmall-6.columns
        .select.link-type(:class="{'is-active': content.type === 'page'}")
          select(v-model="content.page", @change="input")
            option Select Page
            option(value="about") About
            option(value="home") Home
          span.icon-select
      .xsmall-6.columns
        .select.link-type(:class="{'is-active': content.type === 'model'}")
          select(v-model="content.model", @change="input")
            option Select Model
            option(value="products") Products
            option(value="users") Users
          span.icon-select
      .xsmall-6.columns
        .link-type(:class="{'is-active': content.type === 'external'}")
          string(:field="fields.external", :data="content.external", :errors="errors", @input="set")
    label Link Text
      span.required *
    string(:field="fields.text", :data="content.text", :errors="errors", @input="set")
    label Alternate Text
      span.required *
    string(:field="fields.alt", :data="content.alt", :errors="errors", @input="set")
</template>

<script>
import String from './String'
import _ from 'lodash'

export default {
  name: 'Link',
  props: ['data', 'field', 'errors'],
  data: () => ({
    fields: {
      text: {
        name: 'text',
        config: {}
      },
      alt: {
        name: 'alt',
        config: {}
      },
      external: {
        name: 'value',
        config: {}
      }
    },
    content: {
      text: undefined,
      type: undefined,
      alt: undefined,
      external: undefined,
      model: undefined,
      page: undefined
    }
  }),
  mounted() {
    // @NOTE data is saved as string, this helps transitioning
    if (!_.isObject(this.data) && this.data !== 'null') {
      this.content.type = 'external'
      this.content.external = this.data
    } else {
      this.content = _.cloneDeep(this.data)
    }
  },
  components: { String },
  methods: {
    set(e) {
      this.$set(this.content, e.pointer, e.value)
      this.input()
    },
    input() {
      this.$emit('input', { pointer: this.field.name, value: this.content })
    }
  }
}
</script>
