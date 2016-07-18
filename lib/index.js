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
    })
}

/**
 * Given two file tree objects, compare them for differences, and return an
 * array containing the file names of any files that have changed.
 */
exports.changed = function (t1, t2) {
  return objfn.reduce(t1, (m, v, k) => {
    if (t2[k] === v) m.push(k)
    return m
  }, [])
}
