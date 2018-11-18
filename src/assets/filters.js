var showdown = require('showdown')
var converter = new showdown.Converter()
var cheerio = require('cheerio')

let md2html = function (bodyMd) {
  return converter.makeHtml(bodyMd)
}

let html2text = function (bodyHtml) {
  return cheerio.load(bodyHtml).text()
}

let filters = {}

filters.md2html = md2html
filters.html2text = html2text

export default filters
