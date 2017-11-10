<template lang="pug">
div
  header.header.header-page-builder
    nav.page-builder-nav
      ul
        li(v-for="tab in tabs", v-if="requiresLayout(tab.layout)", :class="{'is-active': checkEditor(tab.name)}")
          a(@click="toggleEditor(tab.name)") {{tab.name}}
    .page-builder-save
      router-link.page-builder-cancel(:to="{name: 'websites.pages.index'}") Cancel
      button.btn-primary(@click="save") Save
  .content-container
    .sidebar.sidebar-page-content(:class="{'is-active': checkEditor('Content')}")
      form.page-content-edit
        .page-section-edit(v-for="(row, index) in content", :key="row.id", :class="{'is-closed': row.isClosed}")
          .page-section-edit-header {{ row.name }}
            span.icon.icon-box-down(@click="toggleForm(row)")
          .page-section-edit-content
            FormBuilder(:form="row")
    .sidebar.sidebar-page-layout(:class="{'is-active': checkEditor('Layout')}")
      .sidebar-page-layout-options
        .sidebar-page-layout-header
          h3.sidebar-page-layout-title Containers
        Sortable.sidebar-page-layout-list(:list="containers", :element="'div'", :options="{animation: 300, group: {name: 'items', put: false, pull: 'clone'}}")
          .page-layout-column(v-for="(container, index) in containers", @dblclick="add(container)")
            .sidebar-page-layout-item {{ container.name }}

      .sidebar-page-layout-options
        .sidebar-page-layout-header
          h3.sidebar-page-layout-title Sections
          form.sidebar-page-layout-search
            .search-input
              span.icon-search
              input(type="search", placeholder="Search")
        Sortable.sidebar-page-layout-list(:list="sections", :element="'div'", :options="{animation: 300, group: {name: 'items', put: false, pull: 'clone'}}")
          .page-layout-column(v-for="(section, index) in sections", @dblclick="add(section)")
            .sidebar-page-section-item {{ section.name }}
    .sidebar.sidebar-page-settings(:class="{'is-active': checkEditor('Settings')}")
      FormBuilder.page-settings-edit(:form="page")
    .main-container.main-container-page-builder(v-if="layout.length")
      main.main
        .row
          .xsmall-12.columns
            h2.page-builder-title {{ page.title }}
        .page-builder(:class="{'show-layout-ui': checkEditor('Layout'), 'hide-layout-ui': !checkEditor('Layout')}", v-if="layout.length")
          PageBuilder(:elements="layout", @formData="formData", @remove="remove")
  Modal
</template>

<script>
import _ from 'lodash'
import api from '../../api'
import Form from 'Helpers/Form'
import Sortable from 'Helpers/VueSortable'
import Modal from 'components/Global/Modal'
import PageElement from 'Helpers/PageElement'
import PageBuilder from 'components/Editors/Page'

export default {
  name: 'WebsitePageEditor',
  components: { Sortable, PageBuilder, Modal },
  data () {
    return {
      active_editor: '',
      page: new Form(),
      layout: [],
      deletions: [],
      content: [],
      containers: [],
      sections: [],
      settings: new Form(),
      tabs: [
        {name: 'Content', layout: true },
        {name: 'Layout', layout: false },
        {name: 'Settings', layout: false }
      ]
    }
  },
  created () {
    this.load()
  },
  methods: {
    // formData (formData) {
    //   this.content.push(formData)
    // },
    remove (keys) {
      // _.unset doesn't work with vue data objects :(
      this.deepClean(this.layout, keys)
    },
    deepClean (obj, keys) {
      if (keys.length === 0) return

      let currkey = keys[0]

      if (keys.length === 1) {
        if (obj[currkey].id) {
          this.deletions.push(obj[currkey].id)
        }
        obj.splice(currkey, 1)
      } else {
        keys.splice(0, 1)
        this.deepClean(obj[currkey], keys)
      }
    },
    setForm (structure, data) {
      return this.settings.init(structure, data)
    },
    add (item) {
      console.log(item)
    },
    requiresLayout (bool) {
      return bool ? this.layout.length : true
    },
    checkEditor (editor) {
      return this.active_editor === editor
    },
    toggleEditor (editor) {
      this.active_editor = editor
    },
    toggleForm (item) {
      this.$set(item, 'isClosed', !item.isClosed)
    },
    load () {
      // set page data
      this.fetch('').then(response => {
        let page = response.data.page
        page.structure.forEach((layout) => {
          this.layout.push(new PageElement(layout))
        })

        Object.keys(page.form).forEach(key => {
          this.content.push(new Form(page.form[key], page.content[key]))
        })

        this.page.init(response.data.form, response.data.page)
        this.active_editor = this.layout.length ? 'Content' : 'Settings'
      })
      // set containers available for the page
      this.fetch('containers').then(response => {
        response.data.data.forEach(container => {
          this.containers.push(new PageElement(container))
        })
      })
      // set sections available for the page
      this.fetch('sections').then(response => {
        response.data.data.forEach(section => {
          this.sections.push(new PageElement(section))
        })
      })
    },
    fetch (list) {
      return api.get('/api' + this.$route.fullPath + '/' + list)
    },
    save () {
      return api.put('/api' + this.$route.fullPath, {
        layout: this.layout,
        deletions: this.deletions,
        page: this.page.collection
      }).then(response => {
        console.log(response)
      })
    },
    update () {}
  }
}
</script>
