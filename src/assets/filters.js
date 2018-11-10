var md = require('markdown').markdown
var cheerio = require('cheerio')

let postBodyFilter = function (b) {
  let $ = cheerio.load(md.toHTML(b))
  return $.text().substr(0, 200) + ($.text().length > 200 ? '...' : '')
}

let filters = {}
filters.postBodyFilter = postBodyFilter

export default filters
