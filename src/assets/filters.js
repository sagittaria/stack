var moment = require('moment')
var showdown = require('showdown')
var converter = new showdown.Converter({tables: true, strikethrough: true, tasklists: true})
var cheerio = require('cheerio')

let toLocalTime = function (d) {
  return moment(d).utcOffset(moment().utcOffset()).format('YYYY-MM-DD HH:mm:ss')
}

let md2html = function (bodyMd) {
  return converter.makeHtml(bodyMd)
}

let html2text = function (bodyHtml) {
  return cheerio.load(bodyHtml).text()
}

let filters = {}

filters.md2html = md2html
filters.html2text = html2text
filters.toLocalTime = toLocalTime

export default filters
