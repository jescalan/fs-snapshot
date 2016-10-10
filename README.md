# FS Snapshot

[![npm](http://img.shields.io/npm/v/fs-snapshot.svg?style=flat)](https://badge.fury.io/js/fs-snapshot) [![tests](http://img.shields.io/travis/jescalan/fs-snapshot/master.svg?style=flat)](https://travis-ci.org/jescalan/fs-snapshot) [![dependencies](http://img.shields.io/david/jescalan/fs-snapshot.svg?style=flat)](https://david-dm.org/jescalan/fs-snapshot) [![coverage](http://img.shields.io/coveralls/jescalan/fs-snapshot.svg?style=flat)](https://coveralls.io/github/jescalan/fs-snapshot)

Creates a snapshot of a directory which can be used to determine which files have changed

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Why should you care?

Sometimes in life you need to check a tree of files to see what has changed from the last time you checked it, without constantly watching said files. For example, if you are backing up files once a week, you don't want to back up every file, only the ones that have changed. Same with if you were generating a static site.

FS Snapshot does exactly that. It will produce an object that can be saved to hold on to the state of a file tree, and also a function that can be used to compare two of these objects to produce the names of files that have changed.

### Installation

`npm install fs-snapshot -S`

> **Note:** This project is compatible with node v6+ only

### Usage

To generate a snapshot, use `snapshot.create(root)`. To compare two snapshots, use `snapshot.changed(snapshot1, snapshot2)`. Snapshots are buffers containing zlib-compressed JSON objects. To compress or decompress manually, you can use `snapshot.compress(src)` and `snapshot.decompress(src)`.

```js
const snapshot = require('fs-snapshot')

const snap1 = snapshot.create('./some_files').then(console.log)

// check the output, if you want
snap1.then((s) => {
  console.log(snapshot.decompress(snap1))
})

// wait a while, make some changes to some of the files

const snap2 = snapshot.create('./some_files')

// now we compare the two snapshots
Promise.all([snap1, snap2]).then(([s1, s2]) => {
  // array of files that have changed between the first and second snapshots
  const changedFiles = snapshot.changed(snap1, snap2)
  console.log(changedFiles)
})
```

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
