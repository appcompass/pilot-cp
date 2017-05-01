<template lang="pug">
  .row
    .xsmall-4.columns

      .nav-options-pages
        .nav-options-header
          h2.nav-options-title Pages
        Sortable.nav-option-list(:list="form.collection.repo.pages", :element="'ul'", :options="{animation: 50, group: {name: 'items', pull: 'clone', put: false}}")
          li.nav-option-item(v-for="(item, index) in form.collection.repo.pages", @dblclick="add(item)") {{ item.title }}
      .nav-options-links
        .nav-options-header
          h2.nav-options-title Links
          a.btn-secondary.btn-small.nav-options-trigger(@click="createLink('create-link')") Add Link
        form.nav-options-form(
          :class="{'is-active' : add_link_toggle }"
        )
          FormBuilder(
            v-if="link_form",
            :form="link_form"
          )
          p.nav-item-form-actions
            button.btn-primary.left(type='submit') Save Link
            a.link-text-secondary.left(
            @click="add_link_toggle = !add_link_toggle"
            ) Cancel
        Sortable.nav-option-list(:list="form.collection.repo.links", :element="'ul'", :options="{animation: 50, group: {name: 'items', pull: 'clone', put: false}}")
          li.nav-option-item(v-for="(item, index) in form.collection.repo.links", @dblclick="add(item)")
            | {{ item.title }}
            span.nav-option-item-actions
              span.icon.icon-delete(@click="deleteLink(item)")
    .xsmall-8.medium-7.medium-push-1.columns
      .nav-pages
        //- @TODO: This should be dynamic, i.e. the menu name.
        h2 {{menu_name}}
        MenuElement(:menu="form.collection.menu", @deleted="deleted", :list_class="'nav-list'")
        Sortable.nav-list-empty(v-if="!form.collection.menu.length", :list="form.collection.menu",  :options="{handle: 'li', animation: 50, group: {name: 'items', pull: true, put: true}}")
          | Drag items from the left into your menu.

</template>

<script>

import Sortable from 'Helpers/VueSortable'
import Form from 'Helpers/Form'
import Utils from 'Helpers/Utils'
import MenuElement from 'components/FormFields/MenuElement'
import _ from 'lodash'

export default {
  components: {
    Sortable,
    MenuElement
  },
  props: [ 'form', 'data' ],
  name: 'MenuEditor',
  data () {
    return {
      menu_name: undefined,
      link: {new_tab: false, clickable: false},
      link_form: undefined,
      add_link_toggle: false
    }
  },
  created () {
    this.menu_name = Utils.ucWords(this.data.title.replace(/_/g,' '))
  },
  methods: {
    add (item) {
      this.form.collection.menu.push(_.clone(item, {}, true))
    },
    deleted (item) {
      // mark items for deletion
      if (item.navigatable_id != null) {
        this.form.collection.deletions.push(item.id)
      }
    },
    storeLink (payload) {
      // get a MenuItem instance from the backend
      this.$http.post('/api/menus/', payload)
        .then((response) => {
          this.form.collection.repo.links.push(response.data.link)
          this.form.collection.menu.push(response.data.menuitem)
        })
    },
    createLink (item) {
      this.add_link_toggle = true
      // fetch desired item and pop up a modal
      // this.modal.active = true
      let vm = this
      this.$http.get('/api/menus/forms/' + item)
        .then(function (response) {
          vm.link_form = new Form().init(response.data)
        })
    },
    deleteLink (link) {
      // deletes a Link
      this.$swal({
        title: 'Are you sure?',
        text: 'This will eliminate every instance of this widget from the website',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: true
      }, () => {
        this.$http.delete('/api/menus/links/' + link.id)
          .then(response => {
            this.form.collection.repo.links.splice(this.form.collection.repo.links.indexOf(link), 1)
            this.$swal({title: 'Deleted', type: 'success', timer: 500, showConfirmButton: false})
          }, response => {
            this.$swal({title: 'Error', text: 'Errors while deleting widget', type: 'error'})
          })
      })
    }
  }
}
</script>
