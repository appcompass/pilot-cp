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

  set (data) {
    if (/\./.test(data.pointer) && data.index >= 0) {
      let path = data.pointer.split('.').join(`[${data.index}].`)
      _.set(this.collection, path, data.value)
    } else {
      _.set(this.collection, data.pointer, data.value)
    }
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
      path = path.split('.').join(`[${index}]`)
      return _.get(this.collection, path)
    } else {
      return _.get(this.collection, path)
    }
  }

}
export default Form
