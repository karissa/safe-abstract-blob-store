var Store = require('abstract-blob-store')

module.exports = MemBlobs

function MemBlobs () {
  if (!(this instanceof MemBlobs)) return new MemBlobs()
  this._stores = {}
}

MemBlobs.prototype._list = function (cb) {
  var stores = this._stores
  var names = []
  Object.keys(stores).forEach(function (key) {
    var store = stores[key]
    names.concat(Object.keys(store.data))
  })
  return cb(null, names)
}

MemBlobs.prototype._getStore = function (key) {
  if (!this._stores[key]) {
    this._stores[key] = Store()
  }
  return this._stores[key]
}

MemBlobs.prototype.createWriteStream = function (opts, cb) {
  var name = typeof opts === 'string' ? opts : opts.key
  var store = this._getStore(name)
  return store.createWriteStream(opts, cb)
}

MemBlobs.prototype.createReadStream = function (opts) {
  var name = typeof opts === 'string' ? opts : opts.key
  var store = this._getStore(name)
  return store.createReadStream(opts)
}

MemBlobs.prototype.exists = function (opts, cb) {
  var name = typeof opts === 'string' ? opts : opts.key
  var store = this._getStore(name)
  return store.exists(opts, cb)
}

MemBlobs.prototype.remove = function (opts, cb) {
  var name = typeof opts === 'string' ? opts : opts.key
  var store = this._getStore(name)
  return store.remove(opts, cb)
}
