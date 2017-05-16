    <template lang="pug">
.media-card
  a.media-card-thumb(@click="$emit('select', info)")
    span.thumb-container
      span.thumb-center
        img(:src="src", width="320", height="213", @error="error", @click="$emit('select', {})")
  ul.media-card-info
    li(v-for="item, key in info")
      span {{ filters.capitalize(key) }}:
      |  {{ item }}
  .media-card-actions
    input.media-card-checkbox.left(type="checkbox", @click="$emit('toggle')", :checked="checked")
    a.media-card-delete.right(@click="$emit('unlink')")
      span.icon-delete
      |  Delete
</template>

<script>

export default {
  name: 'Card',
  props: ['info', 'url', 'checked'],
  data: () => ({src: undefined}),
  mounted () {
    this.src = this.url
  },
  methods: {
    error () {
      this.src = 'https://placehold.it/600x400'
    }
  }
}
</script>

<style scoped>
.media-card ul.media-card-info li {
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
