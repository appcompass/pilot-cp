<template lang="pug">
  Sortable(:list="menu", :element="'ul'", :options="options", :class="nav-list")
    li(
      v-if="menu.length > 0"
      v-for="(item, index) in menu",
      :class="{'hide-children': item.isCollapsed}"
    )
      .nav-item(:class="{'is-active': item.inEdit}")
        .nav-item-header
          | {{ item.title }}
          span.nav-item-actions
            span.icon.icon-edit(@click="edit(item, !item.inEdit)")
            span.icon.icon-box-down(v-if="item.children.length", @click="collapse(item, !item.isCollapsed)")
        form.nav-item-form
          label(for='') Label
          input(type='text', value='Home')
          label(for='') Icon
          input(type='text', value='icon-home')
          div
            input(type='checkbox')
            label Open in new Tab
          div
            input(type='checkbox')
            label Clickable
          .nav-item-form-actions
            button.btn-primary.left Save
            a.link-text-secondary.left(href='#') Cancel
            a.link-red.link-icon.right(href='#')
              span.icon-delete(@click="unlink(item)")
              |  Delete
      MenuElement(v-if="item.children.length && !item.isCollapsed", :menu="item.children", @deleted="deleted")
      Sortable(v-if="!item.children.length", :element="'ul'", :list="item.children",  :options="options")
    li(v-else)
      .nav-list-empty(style="margin-bottom: 10px;") Drag items from the left into your menu.
</template>

<script>
import Sortable from 'Helpers/VueSortable'
import Modal from 'Helpers/Modal'
//
export default {
  name: 'MenuElement',
  components: { Sortable },
  props: ['menu'],
  data () {
    return {
      endpoint: null,
      modal: Modal,
      options: {
        handle: '.handle',
        animation: 300,
        group: 'items'
      }
    }
  },
  created () {
    let vm = this
    this.$on('deleted', function (item) {
      vm.$emit('delete', item)
    })
  },
  methods: {
    unlink (item) {
      this.menu.splice(this.menu.indexOf(item), 1)
      this.$emit('deleted', item)
    },
    collapse (item, collapsed) {
      this.$set(item, 'isCollapsed', collapsed)
    },
    edit (item, toggle) {
      this.$set(item, 'inEdit', toggle)

      if (item.type !== null) {
        switch (item.type) {
          case 'Link':
            this.endpoint = 'edit-link'
            break
          case 'Page':
            this.endpoint = 'edit-menu-item'
            break
        }
      }

      this.$http.get('/api/menus/forms/' + this.endpoint)
        .then((response) => {
          this.modal.show(response.data.collection, item, (updated) => {
            // item = Object.assign({}, updated)
            this.$set(this.menu, this.menu.indexOf(item), updated)
            // this.menu.splice(this.menu.indexOf(item), 0, Object.assign({}, updated))
            // console.log(this.menu.indexOf(item))
          })
        })
    },
    deleted (item) {
      this.$emit('deleted', item)
    }
  }
}
</script>
