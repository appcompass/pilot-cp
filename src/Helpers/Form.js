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
    // object assign makes sure the change is noticed
    this.collection = Object.assign({}, data)
    // @TODO initi data recursively -> empty object based on form struct
  }

  init (formStructure, collection) {
    let form = _.cloneDeep(formStructure)
    this.fields = _.cloneDeep(form.fields)
    _.unset(form, 'fields')
    this.form = _.cloneDeep(form)
    if (collection) {
      this.data(collection)
    }
    return this
  }

  set (data, index) {
    let copy = _.cloneDeep(this.collection)
    if (/\./.test(data.pointer) && index >= 0) {
      let path = data.pointer.split('.').join(`[${index}]`)
      _.set(copy, path, data.value)
    } else {
      _.set(copy, data.pointer, data.value)
    }
    this.collection = Object.assign({}, copy)
    this.errors.unset(data.pointer)
  }

  fails (errors) {
    this.errors.set(errors)
  }

  split (point) {
    let form = new Form()
    _.extend(form, this.form)
    form.fields = point.fields
    form.init(form, this.collection)
    form.errors = this.errors
    return form
  }

  get (path, index) {
    if (index >= 0) {
      return this.collection[path][index]
    } else {
      return _.get(this.collection, path)
    }
  }

}
export default Form
