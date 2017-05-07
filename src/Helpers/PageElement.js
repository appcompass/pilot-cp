//
// Page Element
// used in the layout builder
//
class PageElement {
  constructor (data) {
    let children = []
    if (typeof data.children === 'undefined') {
      this.children = []
    } else {
      data.children.forEach((child) => {
        children.push(new PageElement(child))
      })
    }
    Object.assign(this, data)
    this.children = children
    this.type = this.section.type
    this.name = this.section.name
    this.isClosed = false
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
