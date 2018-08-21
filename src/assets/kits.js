var marked = require('marked')
var moment = require('moment')
var cheerio = require('cheerio')

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
  return marked(text || '')
}
let getInnerText = function (text) {
  let $ = cheerio.load(preview(text))
  return $.text()
}

let kits = {}
kits.preview = preview
kits.getInnerText = getInnerText
kits.moment = moment

export default kits
