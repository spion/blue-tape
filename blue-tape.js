var Test = require('tape/lib/test')

function checkPromise (p) {
  return p && p.then && typeof p.then === 'function'
}

Test.prototype.run = function () {
  if (this._skip) {
    return this.end()
  }
  this.emit('prerun')
  try {
    var p = this._cb && this._cb(this)
    var isPromise = checkPromise(p)
    var self = this
    if (isPromise) {
      p.then(function () {
        self.end()
      }, function (err) {
        err ? self.error(err) : self.fail(err)
        self.end()
      })
    }
  } catch (err) {
    if (err) {
      this.error(err)
    } else {
      this.fail(err)
    }
    this.end()
    return
  }
  this.emit('run')
}

Test.prototype.shouldFail = function (promise, clazz) {
  return promise.then(function () {
    throw new Error('should have failed')
  }, function (err) {
    if (clazz && !(err instanceof clazz)) {
      throw new Error('should have thrown an instance of ' + clazz)
    }
    this.ok(true)
  }.bind(this))
}

module.exports = require('tape')
