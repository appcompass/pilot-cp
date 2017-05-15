import Errors from './Errors'
import _ from 'lodash'

export default class Form {
  constructor () {
    this.form = {}
    this.collection = []
    this.fields = {}
    this.resource = {}
    this.errors = new Errors()
  }

  data (data) {
    this.collection = Object.assign({}, data)
  }

  init (formStructure, collection) {
    this.form = _.cloneDeep(formStructure)
    this.fields = _.cloneDeep(formStructure.fields)
    _.unset(this.form, 'fields')
    this.collection = collection || Object.create({})
    return this
  }

  get (path, index) {
    // collection is a single value? return that
    let data = _.get(this.collection, path)
    if (Array.isArray(data)) {
      if (index >= 0) {
        return data[index]
      }
    }
    return data
  }

  set (data, index) {
    // index only applies to single field repeatables
    if (index >= 0) {
      _.set(this.collection, data.pointer + `[${index}]`, data.value)
    } else {
      _.set(this.collection, data.pointer, data.value)
    }
  }

  fails (errors) {
    this.errors.set(errors)
  }

  getErrors (path) {
    // this.path is form path until split()
    return this.errors.get(path, this.path)
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
    // field has no sub-form associated, so it's a single field repeatable
    } else {
      let path = fieldName.split('.').join(`[0]`)
      let target = _.get(this.collection, path)
      if (target && target.length) {
        _.get(this.collection, path).push('')
      } else {
        // push to empty array
        _.set(this.collection, path, [''])
      }
    }
  }

  split (point, index) {
    let form = new Form()
    let path = point.name
    let data = _.get(this.collection, path)
    if (Array.isArray(data)) {
      index = index || 0
      if (typeof data[index] === 'object') {
        data = data[index]
      } else {
        data = this.collection[point.name][index]
      }
    } else {
      data = _.get(this.collection, path)
    }
    form.init(this.form, data)
    form.setPath(point.name)
    form.setFields(point.fields, point.name)
    form.errors = this.errors
    return form
  }

  setPath (path) {
    this.path = path
  }

  setFields (fields, path) {
    fields.forEach(field => {
      if (path !== null) {
        field.path = path
      }
      return field
    })
    this.fields = fields
  }

  asKeyValue (item) {
    if (!this.fields.length) {
      return {}
    }
    let res = {}
    this.fields.forEach((field) => {
      res[field.name] = _.get(item, field.name, '')
    })
    return res
  }

}
// export default Form
