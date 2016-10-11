const zlib = require('zlib')
const readdirp = require('readdirp')
const node = require('when/node')
const objfn = require('objectfn')

/**
 * Create a file tree object with the key as the file path relative to the root,
 * and the value the mtime of the file.
 */
exports.create = function (p, options = {}) {
  return node.call(readdirp, Object.assign({ root: p }, options))
    .then((res) => {
      return res.files.reduce((m, f) => {
        m[f.path] = f.stat.mtime.getTime()
        return m
      }, {})
    }).then((res) => compress(res))
}

/**
 * Given two file tree objects, compare them for differences, and return an
 * array containing the file names of any files that have changed.
 */
exports.changed = function (t1, t2) {
  t1 = t1 ? decompress(t1) : {}
  t2 = t2 ? decompress(t2) : {}
  return objfn.reduce(t1, (m, v, k) => {
    if (t2[k] !== v) m.push(k)
    return m
  }, [])
}

function compress (src) {
  return zlib.deflateSync(JSON.stringify(src))
}

exports.compress = compress

function decompress (src) {
  return JSON.parse(String(zlib.unzipSync(src)))
}

exports.decompress = decompress
