import Form from './Form'

export default {
  active: false,
  form: new Form(),
  cb: null,
  data: {},

  show (data, collection, cb) {
    this.active = true
    this.cb = cb
    this.form.init(data, collection)
  },

  disable () {
    this.active = false
    this.form = new Form()
  },

  done () {
    if (this.cb) {
      this.cb(this.form.collection)
      this.disable()
    } else {
      this.disable()
    }
  },

  set (data) {
    this.form.set(data)
  },

  value (fieldName) {
    this.form.get(fieldName)
  }
}
