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
    this.form = _.cloneDeep(formStructure)
    this.fields = _.cloneDeep(formStructure.fields)
    _.unset(this.form, 'fields')
    this.collection = collection
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
    console.log(this.fields)
    this.errors.set(errors)
  }

  //
  clone (fieldName, fieldIndex) {
    let dataObject = Object.create({})
    if (this.fields[fieldIndex].fields.length) {
      // clone the form associated with the field
      this.fields[fieldIndex].fields.forEach((field) => {
        dataObject[field.name] = null
        if (field.fields.length) {
          dataObject[field.name].fields = this.clone(field.fields)
        }
      })
      this.collection[fieldName].push(dataObject)
      return dataObject
    } else {
      // field has no sub-form associated, so it's a single field repeatable
      // get the data target
      let path = fieldName.split('.').join(`[0]`)
      //
      let target = _.get(this.collection, path)
      // if a field already exist we push on it
      if (target && target.length) {
        _.get(this.collection, path).push('')
      } else {
        // otherwise we instantiate an empty array
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
    form.setFields(point.fields)
    form.errors = this.errors
    return form
  }

  setFields (fields) {
    this.fields = fields
  }

}
export default Form
