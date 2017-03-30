<template lang="pug">
  Sortable(:list="menu", :element="'ul'", :options="options", :class="'nav-list'")
    li(
      v-if="menu.length > 0"
      v-for="(item, index) in menu",
      :class="{'hide-children': item.isCollapsed}"
    )
      .nav-item(:class="{'is-active': item.inEdit && item.form}")
        .nav-item-header
          | {{ item.title }}
          span.nav-item-actions
            span.icon.icon-edit(@click="edit(item)")
            span.icon.icon-box-down(v-if="item.children.length", @click="collapse(item)")
        form.nav-item-form
          FormBuilder(
            v-if="item.form",
            :form="item.form"
          )
          .nav-item-form-actions
            button.btn-primary.left Save
            a.link-text-secondary.left(
              @click="collapse(item)"
            ) Cancel
            a.link-red.link-icon.right(
              @click="unlink(item)"
            )
              span.icon-delete
              |  Delete
      MenuElement(v-if="item.children.length && !item.isCollapsed", :menu="item.children", @deleted="deleted")
      Sortable(v-if="!item.children.length", :element="'ul'", :list="item.children",  :options="options")
    li(v-else)
      .nav-list-empty(style="margin-bottom: 10px;") Drag items from the left into your menu.
</template>

<script>
import Sortable from 'Helpers/VueSortable'
import FormBuilder from 'components/FormBuilder'
import Form from 'Helpers/Form'
import Modal from 'Helpers/Modal'
//
export default {
  name: 'MenuElement',
  components: {
    Sortable,
    FormBuilder
  },
  props: ['menu'],
  data () {
    return {
      endpoint: null,
      modal: Modal,
      options: {
        handle: 'li',
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
    collapse (item) {
      this.$set(item, 'isCollapsed', !item.isCollapsed)
    },
    edit (item) {
      let vm = this
      vm.$set(item, 'inEdit', !item.inEdit)
      if (item.inEdit) {
        if (item.type !== null) {
          switch (item.type) {
            case 'Link':
              vm.endpoint = 'edit-link'
              break
            case 'Page':
              vm.endpoint = 'edit-menu-item'
              break
          }
        }
        vm.$http.get('/api/menus/forms/' + vm.endpoint)
          .then((response) => {
            vm.$set(item, 'form', new Form().init(response.data, item))
          })
      }else{
        vm.$set(item, 'form', undefined)
      }

    },
    deleted (item) {
      this.$emit('deleted', item)
    }
  }
}
</script>
