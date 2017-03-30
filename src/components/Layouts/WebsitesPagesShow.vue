<template lang="pug">
//- @TODO: This massive component can (and should) probabaly get broken up killing some repetative code too.
.site
  header.header.header-page-builder
    nav.page-builder-nav
      ul
        li(
          v-if="layout.length",
          :class="{'is-active': checkEditor('Content')}"
        )
          a(
            @click="toggleEditor('Content')"
          ) Content
        li(
          v-if="layout.length",
          :class="{'is-active': checkEditor('Layout')}"
        )
          a(
            @click="toggleEditor('Layout')"
          ) Layout
        li(
          :class="{'is-active': checkEditor('Settings')}"
        )
          a(
            @click="toggleEditor('Settings')"
          ) Settings
    .page-builder-save
      router-link.page-builder-cancel(
        :to="{name: 'websites.pages.index'}"
      ) Cancel
      button.btn-primary(
        @click="save"
      ) Save
  .content-container
    .sidebar.sidebar-page-content(
      :class="{'is-active': checkEditor('Content')}"
    )
      form.page-content-edit
        .page-section-edit(
          v-for="(row, index) in content",
          :key="row.id",
          :class="{'is-closed': row.isClosed}"
        )
          .page-section-edit-header
            | {{row.name}}
            span.icon.icon-box-down(
              @click="toggleForm(row)"
            )
          .page-section-edit-content
            FormBuilder(
              v-if="row.form",
              :form="setForm(row.form, row.content)"
            )
    .sidebar.sidebar-page-layout(
      :class="{'is-active': checkEditor('Layout')}"
    )
      .sidebar-page-layout-options
        .sidebar-page-layout-header
          h3.sidebar-page-layout-title Containers
        ul.sidebar-page-layout-list
          li(
            v-for="container in containers"
          )
            .sidebar-page-layout-item {{ container.name }}
      .sidebar-page-layout-options
        .sidebar-page-layout-header
          h3.sidebar-page-layout-title Sections
          form.sidebar-page-layout-search
            .search-input
              span.icon-search
              input(type="search", placeholder="Search")
        ul.sidebar-page-layout-list
          li.sidebar-page-section-item(
            v-for="section in sections"
          ) {{section.name}}
    .sidebar.sidebar-page-settings(
      :class="{'is-active': checkEditor('Settings')}"
    )
      FormBuilder(
        v-if="data.form",
        :form="setForm(data.form, data.collection.page)"
      ).page-settings-edit
    .main-container.main-container-page-builder(
      v-if="layout.length"
    )
      main.main
        .row
          .xsmall-12.columns
            h2.page-builder-title {{data.collection.page.title}}
        .page-builder(
          :class="{'show-layout-ui': checkEditor('Layout'), 'hide-layout-ui': !checkEditor('Layout')}"
        )
          PageLayoutBuilder(
            v-if="layout",
            v-for="row in layout",
            :key="row.id",
            :section="row"
          )
</template>

<script>
import _ from 'lodash'
import Form from 'Helpers/Form'
import FormBuilder from 'components/FormBuilder'
import PageLayoutBuilder from 'components/PageLayoutBuilder'

export default {
  name: 'WebsitePageEditor',
  components: {
    FormBuilder,
    PageLayoutBuilder
  },
  data () {
    return {
      active_editor: '',
      layout: [],
      content: [],
      containers: [],
      sections: [],
      data: {}
    }
  },
  created () {
    this.load()
    this.$on('sectionData', function (data) {
      let content_index = _.findIndex(this.content, {'id': data.id})
      if (content_index === -1) {
        this.content.push(data)
      } else {
        this.$set(this.content, content_index, data)
      }
    })
  },
  mounted () {
  },
  methods: {
    checkEditor (editor) {
      return this.active_editor === editor
    },
    toggleEditor (editor) {
      this.active_editor = editor
    },
    toggleForm (item) {
      this.$set(item, 'isClosed', !item.isClosed)
    },
    back () {

    },
    save () {

    },
    setForm (structure, data) {
      return new Form().init(structure, data)
    },
    load () {
      // set page data
      this.populate('', data => {
        this.data = data
        this.layout = data.collection.layout
        if (this.layout.length) {
          this.active_editor = 'Content'
        }else{
          this.active_editor = 'Settings'
        }
      })
      // set containers available for the page
      this.populate('containers')
      // set sections available for the page
      this.populate('sections')
    },
    populate (list, cb) {
      this.$http.get('/api' + this.$route.fullPath + list)
        .then(response => {
          if (list) {
            this[list] = response.data.collection
          }
          if (cb) {
            cb(response.data)
          }
        })
    },
    update () {

    }
  }
}
</script>
