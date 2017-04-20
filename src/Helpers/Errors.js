import _ from 'lodash'

class Errors {
  constructor () {
    this.errors = Object.create({})
  }

  set (errors) {
    for (let key of Object.keys(errors)) {
      if (key === 'debug') {
        continue
      }
      this.errors[key.split('.').pop()] = errors[key]
    }
    // this.errors = Object.assign({}, errors)
  }

  get (path) {
    console.log(this.errors)
    console.log(path)
    if (_.isEmpty(this.errors)) { return }
    if (path == null) {
      return this.errors
    }
    // console.log(_.get(this.errors, path.split('.')[path.split('.').length]))
    return _.get(this.errors, path)
  }

  unset (path) {
    if (!this.errors) {
      return
    }
    _.unset(this.errors, path)
    this.errors = Object.assign({}, this.errors)
  }
}
export default Errors
