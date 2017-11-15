// import Form from 'Helpers/Form'

//
// Page Element
// used in the layout builder
//
class PageElement {
  constructor (data) {
    this.config = Object.assign({width: undefined}, data.section.config)
    this.type = data.section.type
    this.name = data.section.name
    // this.form = data.form
    this.isClosed = false
    this.children = []

    // this.form = new Form()
    // this.form = data.form
    // this.form.init(data.form, data.content)

    if (Array.isArray(data.children)) {
      let children = []
      data.children.forEach((child) => {
        children.push(new PageElement(child))
      })
      this.children = children
    }

    // this.children = children
    return this
  }

  type () {
    return this.type
  }

  formData () {
    return this.form
  }

  collection () {
    return this.content
  }
}

export default PageElement
