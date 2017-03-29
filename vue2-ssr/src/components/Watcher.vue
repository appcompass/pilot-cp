<template>
<div>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'Watcher',
  methods: {
    inView () {
      let rect = this.$el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom >= 0;
    }
  },
  mounted () {
    var vm = this
    document.addEventListener('scroll', () => {
      this.inView() ? this.$emit('in-view') : this.$emit('off-view')
    });
  },
  destroy () {
    document.removeEventListener('scroll')
  }
}
</script>