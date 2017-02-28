import _ from 'lodash'

class Errors {

  constructor () {
    this.errors = {}
  }

  set (errors) {
    for (let key of Object.keys(errors)) {
      _.set(this.errors, key, errors[key])
    }
    return this
  }

  get (path) {
    if (_.isEmpty(this.errors)) { return }
    if (path == null) {
      return this.errors
    }
    return _.get(this.errors, path)
  }

  unset (path) {
    // this.errors = {}
    // return this
    // console.log(path, _.get(this.errors, path))
    _.unset(this.errors, path)
    // console.log(path, _.get(this.errors, path))
    return this
  }
}

export default Errors
