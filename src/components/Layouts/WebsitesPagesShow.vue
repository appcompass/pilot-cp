<template lang="pug">
.site
  header.header.header-page-builder
    nav.page-builder-nav
      ul
        li.is-active
          a(href='#sidebar-page-content') Content
        li
          a(href='#sidebar-page-layout') Layout
        li
          a(href='#sidebar-page-settings') Settings
    .page-builder-save
      a.page-builder-cancel(href='index.php') Cancel
      button.btn-primary Save
  .content-container
    #sidebar-page-content.sidebar.sidebar-page-content.is-active
      form.page-content-edit
        .page-section-edit
          .page-section-edit-header
            | Banner
            span.icon.icon-box-down
          .page-section-edit-content
            div
              label(for='') Image
              .file-input
                input#file(type='file')
                label(for='file') Choose File
                .file-input-value
                  span.file-input-image
                    span.file-input-remove.icon-cancel
                    img(src='http://placehold.it/320x213', width='320', height='213')
            div
              label(for='') Heading
              input(type='text', value='Meet The Team')
            div
              label(for='') Heading
              textarea
                | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in pellentesque eros.
            div
              label(for='') Button Text
              input(type='text', value='Contact Us')
            div
              label(for='') Button Link
              input(type='text', value='/contact-us')
        .page-section-edit
          .page-section-edit-header
            | Banner
            span.icon.icon-box-down
          .page-section-edit-content
            div
              label(for='') Image
              .file-input
                input#file(type='file')
                label(for='file') Choose File
                .file-input-value
                  span.file-input-image
                    span.file-input-remove.icon-cancel
                    img(src='http://placehold.it/320x213', width='320', height='213')
            div
              label(for='') Heading
              input(type='text', value='Meet The Team')
            div
              label(for='') Heading
              textarea
                | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in pellentesque eros.
            div
              label(for='') Button Text
              input(type='text', value='Contact Us')
            div
              label(for='') Button Link
              input(type='text', value='/contact-us')
    #sidebar-page-layout.sidebar.sidebar-page-layout
      .sidebar-page-layout-options
        .sidebar-page-layout-header
          h3.sidebar-page-layout-title Layouts
        ul.sidebar-page-layout-list
          li
            .sidebar-page-layout-item Full Width
          li
            .sidebar-page-layout-item One Column
          li
            .sidebar-page-layout-item Two Columns
          li
            .sidebar-page-layout-item Three Columns
          li
            .sidebar-page-layout-item Four Columns
          li
            .sidebar-page-layout-item Five Columns
          li
            .sidebar-page-layout-item Six Columns
      .sidebar-page-layout-options
        .sidebar-page-layout-header
          h3.sidebar-page-layout-title Sections
          form.sidebar-page-layout-search
            .search-input
              span.icon-search
              input(type='search', placeholder='Search')
        ul.sidebar-page-layout-list
          li
            .sidebar-page-section-item Banner
          li
            .sidebar-page-section-item Image Slider
          li
            .sidebar-page-section-item Default Content
          li
            .sidebar-page-section-item Callout Box
          li
            .sidebar-page-section-item Portfolio
    #sidebar-page-settings.sidebar.sidebar-page-settings
      form.page-settings-edit
        div
          label(for='') Page Title
          input(type='text', value='Meet The Team')
        div
          label(for='') Page Description
          textarea
            | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in pellentesque eros.
        div
          label(for='') Keywords
          input(type='text', value='Contact Us')
    .main-container.main-container-page-builder
      main.main
        .row
          .xsmall-12.columns
            h2.page-builder-title About Us
        .page-builder.hide-layout-ui
          .page-layout-row
            .page-layout-column(style='width:100%;')
              .page-layout
                .page-layout-header
                  | Full Width
                  span.icon.icon-box-down
                .page-layout-content
                  .page-section Banner
          .page-layout-row
            .page-layout-column(style='width:40%;')
              .page-layout
                .page-layout-header
                  | Four Columns
                  span.icon.icon-box-down
                .page-layout-content
                  .page-section Recent News
                  .page-section Callout Box
                  .page-section Newsletter Sign Up
            .page-layout-column(style='width:60%;')
              .page-layout
                .page-layout-header
                  | Eight Columns
                  span.icon.icon-box-down
                .page-layout-content
                  .page-section Default Content
                  .page-layout-row
                    .page-layout-column(style='width:33.333%;')
                      .page-layout
                        .page-layout-header
                          | Four Columns
                          span.icon.icon-box-down
                        .page-layout-content
                          .page-section Default Content
                    .page-layout-column(style='width:33.333%;')
                      .page-layout
                        .page-layout-header
                          | Four Columns
                          span.icon.icon-box-down
                        .page-layout-content
                          .page-section Default Content
                    .page-layout-column(style='width:33.333%;')
                      .page-layout
                        .page-layout-header
                          | Four Columns
                          span.icon.icon-box-down
                        .page-layout-content
                          .page-section Default Content
          .page-layout-row
            .page-layout-column(style='width:25%;')
              .page-layout
                .page-layout-header
                  | Three Columns
                  span.icon.icon-box-down
                .page-layout-content
                  .page-section Default Content
            .page-layout-column(style='width:25%;')
              .page-layout
                .page-layout-header
                  | Three Columns
                  span.icon.icon-box-down
                .page-layout-content
                  .page-section Default Content
            .page-layout-column(style='width:25%;')
              .page-layout
                .page-layout-header
                  | Three Columns
                  span.icon.icon-box-down
                .page-layout-content
                  .page-section Default Content
            .page-layout-column(style='width:25%;')
              .page-layout
                .page-layout-header
                  | Three Columns
                  span.icon.icon-box-down
                .page-layout-content
                  .page-section Default Content
</template>

<script>
export default {
  name: 'PrivateFullScreen',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
