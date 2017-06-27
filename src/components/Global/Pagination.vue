<template lang="pug">
  div.pagination(v-if="pagination.last_page")
    ul
      li.prev(
        :class="{'is-disabled': pagination.current_page === 1}",
        @click="turn(-1)",
        :disabled="disabled"
      )
        a
          span.icon-arrow-back

      li(:class="{'is-active': pagination.current_page === 1}", @click.prevent="goto(1)")
        a() 1

      li(v-if="pagination.current_page >= 6") ...
      li(
        v-for="page in pages",
        v-if="page !== 1 && page !== pagination.last_page && page > pagination.current_page-4 && page < pagination.current_page+4",
        :class="{'is-active': pagination.current_page === page}",
        @click.prevent="goto(page)"
      )
        a() {{ page }}

      li(v-if="pagination.current_page <= pagination.last_page-5") ...

      li(
        :class="{'is-active': pagination.current_page === pagination.last_page}",
        @click.prevent="goto(pagination.last_page)"
      )
        a() {{ pagination.last_page }}

      li.next(
        :class="{'is-disabled': pagination.last_page === pagination.current_page}",
        @click.prevent="turn(1)",
        :disabled="disabled"
      )
        a
          span.icon-arrow-forward
</template>

<script>
import _ from 'lodash'

export default {
  name: 'pagination',
  props: ['p', 'disabled'],
  data: () => ({pagination: {}}),
  computed: {
    pages () {
      return _.range(1, this.pagination.last_page + 1)
    }
  },
  mounted () {
    this.pagination = this.p
  },
  methods: {
    turn (amt) {
      if (this.pagination.current_page + amt > 0 && this.pagination.current_page + amt <= this.pagination.last_page) {
        this.pagination.current_page += amt
      }
      this.$emit('page', this.pagination.current_page)
    },
    goto (page) {
      this.pagination.current_page = page
      this.$emit('page', this.pagination.current_page)
    }
  }
}
</script>
