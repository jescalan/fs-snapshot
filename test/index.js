const test = require('ava')
const path = require('path')
const snapshot = require('..')
const fixtures = path.join(__dirname, 'fixtures')
const zlib = require('zlib')

test('create', (t) => {
  return snapshot.create(path.join(fixtures, 'basic')).then((snap) => {
    const src = JSON.parse(String(zlib.unzipSync(snap)))
    t.truthy(Object.keys(src).length === 5)
    t.truthy(typeof src['foo.txt'] === 'number')
  })
})

test('compare', (t) => {
  const changed = snapshot.changed(snapshot.compress({
    foo: 1468770178000,
    bar: 1468770187000
  }), snapshot.compress({
    foo: 1468797693000,
    bar: 1468770187000
  }))
  t.truthy(changed.length === 1)
  t.truthy(changed[0] === 'foo')
})
