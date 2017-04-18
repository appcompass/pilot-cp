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
      if (data.subindex) {
        path = path + `[${data.subindex}]`
      }
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
    // does field have a linked form associated?
    if (this.fields[fieldIndex].fields.length) {
      this.fields[fieldIndex].fields.forEach((field) => {
        dataObject[field.name] = null
        if (field.fields.length) {
          dataObject[field.name].fields = this.clone(field.fields)
        }
      })
      this.collection[fieldName].push(dataObject)
      return dataObject
    // field has no sub-forl associated, so it's a single field repeatable
    } else {
      let path = fieldName.split('.').join(`[0]`)
      let target = _.get(this.collection, path)
      if (target && target.length) {
        _.get(this.collection, path).push('')
      } else {
        // push to empty array
        let content = ['New Item', 'Another Item']
        _.set(this.collection, path, content)
      }
    }
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
    // @TODO generate content from form if not present
    if (index >= 0) {
      path = path.split('.').join(`[${index}]`)
      return _.get(this.collection, path)
    } else {
      path = path.split('.').join(`[0]`)
      if (Array.isArray(_.get(this.collection, path))) {
        return _.get(this.collection, path)
      } else {
        return _.get(this.collection, path)
      }
    }
  }

}
export default Form
