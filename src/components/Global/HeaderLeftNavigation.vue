<template lang="pug">
  ul.header-nav.header-nav-primary
    li(v-for="cat in navigation")
      router-link(:to="cat.url" exact, v-if="cat.url") {{ cat.title }}
      a(v-else) {{ cat.title }}
      ul(v-if="cat.children")
        li(v-for="item in cat.children")
          router-link(:to="item.url") {{ item.title }}
</template>

<script>
export default {
  name: 'HeaderLeftNavigation',
  data () {
    return {
    }
  },
  computed: {
    navigation ()  {
      return this.$store.getters.main_nav
    }
  }
}
</script>
