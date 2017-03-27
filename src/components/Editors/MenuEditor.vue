<template lang="pug">
  .row
    .xsmall-4.columns
      .nav-options-pages
        .nav-options-header
          h2.nav-options-title Pages
        Sortable.nav-option-list(:list="form.collection.repo.pages", :element="'ul'", :options="{animation: 50, group: 'items', clone: true}")
          li.nav-option-item(v-for="(item, index) in form.collection.repo.pages", @dblclick="add(item)") {{ item.title }}
      .nav-options-links
        .nav-options-header
          h2.nav-options-title Widgets
          a.btn-secondary.btn-small.nav-options-trigger(@click="createLink('create-link')") Add Link
        form.nav-options-form
          input(type='text', placeholder='Title')
          input(type='text', placeholder='URL')
          p
            button.btn-primary(type='submit') Save Link
        Sortable.nav-option-list(:list="form.collection.repo.links", :element="'ul'", :options="{animation: 50, group: 'items', clone: true}")
          li.nav-option-item(v-for="(item, index) in form.collection.repo.links", @dblclick="add(item)")
            | {{ item.title }}
            span.nav-option-item-actions
              span.icon.icon-delete(@click="deleteLink(item)")
    .xsmall-8.medium-7.medium-push-1.columns
      .nav-pages
        //- @TODO: This should be dynamic, i.e. the menu name.
        h2 Menu
        MenuElement(:menu="form.collection.menu", @deleted="deleted", :class="'nav-list'")
        Sortable.empty(v-if="!form.collection.menu.length", :list="form.collection.menu",  :options="{handle: '.handle', animation: 50, group: 'items'}")
</template>

<script>
import Sortable from 'Helpers/VueSortable'
import MenuElement from '../FormBuilder/MenuElement'
import Modal from 'Helpers/Modal'
import _ from 'lodash'

export default {
  components: { Sortable, MenuElement },
  props: [ 'form', 'data', 'errors' ],
  name: 'menu-editor',
  data () {
    return {
      modal: Modal,
      link: {new_tab: false, clickable: false}
    }
  },
  created () {},
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
      // fetch desired item and pop up a modal
      // this.modal.active = true
      this.$http.get('/api/menus/forms/' + item)
        .then(function (response) {
          // response.data.collection -> form
          this.modal.show(response.data.collection, this.link, (result) => {
            return this.storeLink(result)
          })
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
