var moment = require('moment')
var showdown = require('showdown')
var converter = new showdown.Converter({tables: true, strikethrough: true, tasklists: true})
var cheerio = require('cheerio')
var _ = require('lodash')

let toLocalTime = function (d) {
  return moment(d).utcOffset(moment().utcOffset()).format('YYYY-MM-DD HH:mm:ss')
}

let md2html = function (bodyMd) {
  return converter.makeHtml(bodyMd)
}

let html2text = function (bodyHtml) {
  return cheerio.load(bodyHtml).text()
}

let text2truncate = function (bodyText) {
  return _.truncate(bodyText, { length: 350 })
}

let objectId2localTime = function (_id) {
  let ts = parseInt(_id.substr(0, 8), 16) * 1000
  let createdAt = new Date(ts)
  return toLocalTime(createdAt)
}

let filters = {}

filters.md2html = md2html
filters.html2text = html2text
filters.toLocalTime = toLocalTime
filters.text2truncate = text2truncate
filters.objectId2localTime = objectId2localTime

export default filters
