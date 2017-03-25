module.exports = {
  created: function () {
  },
  methods: {
    getRouteName (sub) {
      return this.$route.name.replace(/\.[^/.]+$/, sub ? '.' + sub : '')
    },
    getRouteParams (id) {
      let basename = this.getRouteName()
      let params = {}
      params[basename.split('.').pop()] = id
      return params
    },
    buildLink (url) {
      let params = this.$route.params
      let pattern = /:([a-z]+)+/g
      let match
      while ((match = pattern.exec(url)) != null) {
        if (match[1] && params[match[1]]) {
          url = url.replace(match[0], params[match[1]])
        } else if (match[1] && !params[match[1]]) {
          url = url.replace(match[0], '')
        } else {
          console.log(match)
        }
      }
      return url
    }
  }
}
