const test = require('ava')
const path = require('path')
const snapshot = require('..')
const fixtures = path.join(__dirname, 'fixtures')

test('create', (t) => {
  return snapshot.create(path.join(fixtures, 'basic')).then((snap) => {
    t.truthy(Object.keys(snap).length === 5)
    t.truthy(typeof snap['foo.txt'] === 'number')
  })
})

test('compare', (t) => {
  const changed = snapshot.changed({
    foo: 1468770178000,
    bar: 1468770187000
  }, {
    foo: 1468797693000,
    bar: 1468770187000
  })
  t.truthy(changed.length === 1)
  t.truthy(changed[0] === 'bar')
})
