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

function noop() {}

Test.prototype.shouldFail =
Test.prototype.shouldReject =
function (promise, expected, message, extra) {
  var self = this
  return promise.then(function () {
    self.throws(noop, expected, message, extra)
  }, function (err) {
    function f() {throw err}
    self.throws(f, expected, message, extra)
  })
}


module.exports = require('tape')
