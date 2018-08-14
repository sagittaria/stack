var marked = require('marked')

let truncate = function (text, len) {
  return text.length > len ? text.substr(0, len) + '...' : text
}

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
let preview = function (text) {
  return marked(text)
}

let kits = {}
kits.truncate = truncate
kits.preview = preview

export default kits
