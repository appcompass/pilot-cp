<template lang="pug">
  div.pagination(v-if="p.last_page")
    ul
      li.prev(
        :class="{'is-disabled': p.current_page === 1}",
        @click="turn(-1)",
        :disabled="disabled"
      )
        a
          span.icon-arrow-back

      li(
        :class="{'is-active': p.current_page === 1}",
        @click.prevent="goto(1)"
      )
        a(
        ) 1

      li(
        v-if="p.current_page > 4"
      ) ...

      li(
        v-for="page in pages",
        v-if="page !== 1 && page !== p.last_page && page >= p.current_page-2 && page <= p.current_page+2",
        :class="{'is-active': p.current_page === page}",
        @click.prevent="goto(page)"
      )
        a(
        ) {{ page }}

      li(
        v-if="p.current_page <= p.last_page-4"
      ) ...

      li(
        :class="{'is-active': p.current_page === p.last_page}",
        @click.prevent="goto(p.last_page)"
      )
        a(
        ) {{ p.last_page }}

      li.next(
        :class="{'is-disabled': p.last_page === p.current_page}",
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
  computed: {
    pages () {
      return _.range(1, this.p.last_page + 1)
    }
  },
  methods: {
    turn (amt) {
      if (this.p.current_page + amt > 0 && this.p.current_page + amt <= this.p.last_page) {
        this.p.current_page += amt
      }
    },
    goto (page) {
      this.p.current_page = page
    }
  }
}
</script>
