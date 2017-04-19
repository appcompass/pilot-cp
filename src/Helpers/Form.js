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
    // this.form = _.cloneDeep(form)
    this.collection = collection
    // if (collection) {
    //   this.data(collection)
    // }
    return this
  }

  get (path, index) {
    // collection is a single value? return that
    if (this.collectionIsSingleValue()) {
      // console.log(this.collection)
      return this.collection
    }
    let data = _.get(this.collection, path)
    if (Array.isArray(data)) {
      if (index >= 0) {
        console.log(path)
        return data[index]
      }
    }
    return data
  }

  set (data) {
    console.log(data)
    // if (this.collectionIsSingleValue()) {
    //   this.collection = data.value
    // }
    _.set(this.collection, data.pointer, data.value)
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

  split (point, index) {
    let form = new Form()
    // _.extend(form, this.form)
    let path = point.name
    let data = _.get(this.collection, path)
    if (Array.isArray(data)) {
      // check point.fields or point.config.repeatable
      index = index || 0
      if (typeof data[index] === 'object') {
        // console.log('repeatable is an object: ' + point.name)
        data = data[index]
      } else {
        // console.log('repeatable is a single field: ' + point.name)
        data = this.collection[point.name][index]
      }
    } else {
      data = _.get(this.collection, path)
    }
    form.init(this.form, data)
    form.setFields(point.fields)
    form.errors = this.errors
    // console.log(form)
    return form
  }

  setFields (fields) {
    this.fields = fields
  }

  collectionIsSingleValue () {
    return !Array.isArray(this.collection) && typeof this.collection !== 'object'
  }

}
export default Form
