<template lang="pug">
section.section
  router-view
  section.hero.is-primary
    .container
      .hero-body
        h1.title Welcome!
        h2.subtitle This is the Pilot-io CMS!
</template>

<script>
  export default {
    name: 'HomeView'
  }
</script>
