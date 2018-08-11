let truncate = function (text, len) {
  return text.length > len ? text.substr(0, len) + '...' : text
}

let kits = {}
kits.truncate = truncate

export default kits
