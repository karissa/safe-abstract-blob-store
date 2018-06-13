# safe-abstract-blob-store

Safe in-memory blob store 

[![blob-store-compatible](https://raw.githubusercontent.com/maxogden/abstract-blob-store/master/badge.png)](https://github.com/maxogden/abstract-blob-store)

> filesystem [blob store](https://github.com/maxogden/abstract-blob-store) with atomic writes and high file limits on Windows

This module exposes the same API as
[abstract-blob-store](https://github.com/mafintosh/abstract-blob-store), but has a _list function for compatibility with `safe-fs-blob-store` -like modules

## Usage

``` js
var store = require('safe-abstract-blob-store')
var blobs = store('some-directory')

var ws = blobs.createWriteStream({
  key: 'some/path/file.txt'
})

ws.write('hello world\n')
ws.end(function() {
  var rs = blobs.createReadStream({
    key: 'some/path/file.txt'
  })

  rs.pipe(process.stdout)
})
```

## License

ISC

