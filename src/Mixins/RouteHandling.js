module.exports = {
  created: function () {},
  methods: {
    activeNav (url) {
      return this.buildUrl(url) === this.$route.fullPath
    },
    getRouteName (sub) {
      return this.$route.name.replace(/\.[^/.]+$/, sub ? '.' + sub : '')
    },
    getRouteParams (id) {
      let basename = this.getRouteName()
      let params = {}
      params[basename.split('.').pop()] = id
      return params
    },
    getApiUrl (sub) {
      let url = this.$route.fullPath
      let pos = url.lastIndexOf(sub)
      if (pos !== -1) {
        return url.substring(0, pos) + url.substring(pos)
      } else {
        return url + '/' + sub
      }
    },
    buildUrl (url) {
      let params = this.$route.params
      let pattern = /:([a-z]+)+/g
      url = url.replace(pattern, (match, word, pos) => {
        if (params[word]) {
          return params[word]
        } else {
          return ''
        }
      })
      return url
    },
    reverseUrl () {
      let rtn = this.$route.fullPath
      for (let key in this.$route.params) {
        rtn = rtn.replace(this.$route.params[key], ':' + key)
      }
      return rtn
    }
  }
}
