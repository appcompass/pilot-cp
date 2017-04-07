<template lang="pug">
  div
    div(
      v-if="section.section.type === 'container'"
    )
      .page-layout-column(
        :style="{'width': section.section.config.width ? section.section.config.width : '100%'}"
      )
        .page-layout(
          :class="{'is-closed': section.isClosed}"
        )
          .page-layout-header
            | {{section.section.name}}
            span.icon.icon-box-down(
              @click="toggle()"
            )
          .page-layout-content(
            v-if="section.children"
          )
            PageLayoutBuilder(
              v-for="row in section.children",
              :key="row.id",
              :section="row"
            )
    div.page-section(
      v-else
      @click="select()",
      :class="{'is-active': section.isActive}"

    ) {{section.section.name}}
</template>

<script>
import Sortable from 'Helpers/VueSortable'

export default {
  name: 'PageLayoutBuilder',
  props: ['section'],
  components: { Sortable },
  data () {
    return {
    }
  },
  created () {
    this.emit()
    this.$on('sectionData', function (data) {
      this.$parent.$emit('sectionData', data)
    });
  },
  mounted () {
  },
  methods: {
    emit () {
      if (this.section.form) {
        this.$parent.$emit('sectionData', {
          id: this.section.id,
          isActive: this.section.isActive,
          name: this.section.section.name,
          form: this.section.form,
          content: this.section.content
        })
      }
    },
    toggle () {
      this.$set(this.section, 'isClosed', !this.section.isClosed)
    },
    select () {
      this.$set(this.section, 'isActive', !this.section.isActive)
      this.emit()
    }
  }
}
</script>
