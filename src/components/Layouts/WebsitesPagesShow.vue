<template lang="pug">
.site
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
          .page-section-edit-header
            | {{ row.name }}
            span.icon.icon-box-down(@click="toggleForm(row)")
          .page-section-edit-content
            FormBuilder(:form="row.form")
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
    .main-container.main-container-page-builder(v-if="layout.length")
      main.main
        .row
          .xsmall-12.columns
            h2.page-builder-title {{ data.collection.page.title }}
        .page-builder(:class="{'show-layout-ui': checkEditor('Layout'), 'hide-layout-ui': !checkEditor('Layout')}", v-if="layout.length")
          PageBuilder(:elements="layout", @formData="formData")
</template>

<script>
import _ from 'lodash'
import Form from 'Helpers/Form'
import FormBuilder from 'components/FormBuilder'
import Sortable from 'Helpers/VueSortable'
import PageElement from 'Helpers/PageElement'
import PageBuilder from 'components/Editors/PageBuilder'

export default {
  name: 'WebsitePageEditor',
  components: { FormBuilder, Sortable, PageBuilder },
  data () {return {
      active_editor: '',
      layout: [],
      content: [],
      containers: [],
      sections: [],
      data: {},
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
    formData (formData) {
      this.content.push(formData)
    },
    add (item) {
      console.log(item)
    },
    // sectionData (data) {
    //   let content_index = _.findIndex(this.content, {'id': data.id})
    //   if (content_index === -1) {
    //     this.content.push(data)
    //   } else {
    //     this.$set(this.content, content_index, data)
    //   }
    // },
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
    // setForm (structure, data) {
    //   return new Form().init(structure, data)
    // },
    load () {
      // set page data
      this.fetch('').then(response => {
        this.data = response.data
        response.data.collection.layout.forEach((layout) => {
          this.layout.push(new PageElement(layout))
        })
        // this.layout = response.data.collection.layout
        this.active_editor = this.layout.length ? 'Content' : 'Settings'
      })
      // set containers available for the page
      this.fetch('containers').then(response => {
        response.data.collection.forEach(container => {
          this.containers.push(new PageElement(container))
        })
      })
      // set sections available for the page
      this.fetch('sections').then(response => {
        response.data.collection.forEach(section => {
          this.sections.push(new PageElement(section))
        })
      })
    },
    fetch (list) {
      return this.$http.get('/api' + this.$route.fullPath + list)
    },
    save () {},
    update () {}
  }
}
</script>
