var md = require('markdown').markdown
var cheerio = require('cheerio')

let postBodyFilter = function (b) {
  let $ = cheerio.load(md.toHTML(b))
  return $.text().substr(0, 200) + ($.text().length > 200 ? '...' : '')
}

let md2htmlFilter = function (body) {
  return md.toHTML(body)
}

let filters = {}
filters.postBodyFilter = postBodyFilter
filters.md2htmlFilter = md2htmlFilter

export default filters
