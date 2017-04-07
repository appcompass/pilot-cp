// import _ from 'lodash'

export default {

  ucWords (str) {
    return str.toLowerCase().replace(/\b[a-z]/g, letter => {
      return letter.toUpperCase()
    })
  }
}
