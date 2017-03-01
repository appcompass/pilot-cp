import Errors from './Errors'
import _ from 'lodash'

class Form {

  constructor () {
    this.form = {}
    this.collection = {}
    this.fields = {}
    this.resource = {}
    this.errors = new Errors()
  }

  data (data) {
    this.collection = Object.assign({}, data)
    // @TODO initi data recursively -> empty object based on form struct
  }

  init (data, collection) {
    let form = _.cloneDeep(data)
    this.fields = _.cloneDeep(form.fields)
    _.unset(form, 'fields')
    this.form = _.cloneDeep(form)
    if (collection) {
      this.data(collection)
    }
    return this
  }

  set (data) {
    _.set(this.collection, data.pointer, data.value)
    this.collection = Object.assign({}, this.collection)
    this.errors.unset(data.pointer)
  }

  fails (errors) {
    this.errors.set(errors)
  }

  get (path, index) {
    // check if there's content set
    let c = _.get(this.collection, path)

    return c

    // console.log(path)

    // no content (create or empty property) with nested fields
    // if (c == null && field.fields.length) {
    //   field.fields.forEach((single) => {
    //     // @TODO vue dot.separated resolution seems a bit wonky, investigate
    //     // also check if we should clone this dude
    //     _.set(this.content, field.name, {})
    //     this.$set(this.content, field.name, {})
    //   })
    // }

    // return index >= 0 && Array.isArray(c) ? c[index] : c
  }

}

export default Form
