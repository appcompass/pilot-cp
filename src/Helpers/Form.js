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

  clone (fieldName, fieldIndex) {
    let dataObject = Object.create({})
    this.fields[fieldIndex].fields.forEach((field) => {
      dataObject[field.name] = null
      if (field.fields.length) {
        dataObject[field.name].fields = this.clone(field.fields)
      }
    })
    if (!Array.isArray(this.collection[fieldName])) {
      this.collection[fieldName] = []
      this.collection[fieldName].push('')
      // _.set(this.collection[fieldName], [dataObject])
    } else {
      this.collection[fieldName].push(dataObject)
    }
    return dataObject
  }

  split (point) {
    console.log(point.fields)
    let form = new Form()
    _.extend(form, this.form)
    form.fields = point.fields
    form.init(form, this.collection)
    form.errors = this.errors
    return form
  }

  get (path, index) {
    // @TODO generate content from form if not present
    if (index >= 0) {
      path = path.split('.').join(`[${index}]`)
    }
    let data = _.get(this.collection, path)
    console.log(data)
    return data
    // return _.get(this.collection, path)
  }

}
export default Form
