import moment from 'moment'

module.exports = function (Vue) {
  Vue.directive('moment-ago', {
    bind (el, binding) {
      el.innerHTML = ' ' + moment(binding.value, 'YYYY-MM-DD HH:mm:ss').fromNow()
      el.interval = setInterval(() => {
        el.innerHTML = ' ' + moment(binding.value, 'YYYY-MM-DD HH:mm:ss').fromNow()
      }, 1000)
    },
    update (el, binding) {
      clearInterval(el.interval)
      el.innerHTML = ' ' + moment(binding.value, 'YYYY-MM-DD HH:mm:ss').fromNow()
      el.interval = setInterval(() => {
        el.innerHTML = ' ' + moment(binding.value, 'YYYY-MM-DD HH:mm:ss').fromNow()
      }, 1000)
    },
    unbind (el, binding, vnode) {
      clearInterval(el.interval)
    }
  })
}
