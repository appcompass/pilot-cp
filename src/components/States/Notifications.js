// import Vue from '../../main.js'

function countObjects (obj) {
  var count = 0
  for (var key in obj) {
    count = count + obj[key].items.length
  }
  return count
}
// @TODO: delete, temp for demo purposes
function d2 (n) {
  if (n < 9) return '0' + n
  return n
}

// @TODO: delete, temp for demo purposes
function formatDate (date) {
  var newDate = new Date(date)
  return newDate.getFullYear() +
    '-' + d2(parseInt(newDate.getMonth() + 1)) +
    '-' + d2(newDate.getDate()) +
    ' ' + d2(newDate.getHours()) +
    ':' + d2(newDate.getMinutes()) +
    ':' + d2(newDate.getSeconds())
}

export default {
  full: null,
  count: 0,
  is_open: false,
  open: {},
  toggleView () {
    this.is_open = !this.is_open
  },
  init () {
    var stamp = new Date()
    // @TODO: query backend on init, update via socket after.
    this.full = {
      // @TODO: delete, temp for demo purposes
      users: {
        items: [
          {
            type: 'Logout',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Trinity logged out.'
          }, {
            type: 'Logout',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Neo logged out.'
          }, {
            type: 'Login',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Trinity logged in.'
          }, {
            type: 'Login',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Neo logged in.'
          }, {
            type: 'Logout',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Agent Smith logged out.'
          }
        ]
      },
      media: {
        items: [
          {
            type: 'Upload',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Neo uploaded 4 photos.'
          }, {
            type: 'Upload',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Trinity uploaded 5 videos.'
          }, {
            type: 'Deletion',
            time: formatDate(stamp.setMinutes(stamp.getMinutes() - 3)),
            message: 'Agent Smith deleted 3 photos and 5 videos.'
          }
        ]
      }
    }
    this.count = countObjects(this.full)
  },
  clear () {
    this.full = null
    this.count = 0
  }
}
