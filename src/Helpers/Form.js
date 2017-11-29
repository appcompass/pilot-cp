import _ from 'lodash'

const Form = class Form {
  constructor (form, collection) {
    this.collection = {}
    this.errors = {}
    if (form && collection) {
      this.init(form, collection)
    }
  }

  init (form, collection) {
    this.name = form.name
    this.editor = form.editor
    this.id = form.id
    this.fields = form.fields
    _.set(this.collection, form.structure)
    Object.assign(this.collection, collection)
  }

  set (data) {
    _.set(this.collection, data.pointer, data.value)
  }

  get (path) {
    if (_.isNull(path)) {
      return this.collection
    }
    return _.get(this.collection, path)
  }

  fail (errors) {
    delete errors.debug
    let ers = {}
    Object.keys(errors).forEach(key => {
      _.set(ers, key, errors[key])
    })
    this.errors = ers
  }

  error (path) {
    if (!_.isNull(path)) {
      return _.get(this.errors, path, {})
    }
    return this.errors
  }

  clearError (path) {
    _.unset(this.errors, path)
  }
}

export default Form
